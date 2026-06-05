// ১ মোবাইল = ১ আইডি রেস্ট্রিকশন লজিক সহ ব্যাকএন্ড
global.users = global.users || [{ username: 'admin', password: '123', role: 'admin', balance: 0 }];
global.devices = global.devices || {};

export default function handler(req, res) {
  const { action, username, password, refBy, deviceId } = req.body;

  if (action === 'register') {
    if (global.devices[deviceId]) {
      return res.status(400).json({ message: 'এই মোবাইল থেকে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা হয়েছে!' });
    }
    const userExists = global.users.find(u => u.username === username);
    if (userExists) return res.status(400).json({ message: 'এই ইউজারনেমটি ইতিমধ্যে নেওয়া হয়েছে।' });

    const newUser = { username, password, role: 'user', balance: 0, refBy };
    global.users.push(newUser);
    global.devices[deviceId] = username; // ডিভাইস লক করা হলো

    // রেফারেল বোনাস (সরাসরি ৫ টাকা যোগ হবে মূল ইউজারের অ্যাকাউন্টে)
    if (refBy) {
      const referrer = global.users.find(u => u.username === refBy);
      if (referrer) referrer.balance += 5; 
    }

    return res.status(200).json({ user: newUser });
  }

  if (action === 'login') {
    const user = global.users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(400).json({ message: 'ভুল ইউজারনেম বা পাসওয়ার্ড!' });
    return res.status(200).json({ user });
  }
}
