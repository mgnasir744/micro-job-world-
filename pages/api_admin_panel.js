export default function handler(req, res) {
  global.submissions = global.submissions || [];
  global.users = global.users || [];

  if (req.method === 'GET') {
    const pendingTasks = global.submissions.filter(s => s.status === 'pending');
    return res.status(200).json({ submissions: pendingTasks });
  }

  if (req.method === 'POST') {
    const { id, username, reward, action } = req.body;
    
    if (action === 'approve') {
      const user = global.users.find(u => u.username === username);
      if (user) user.balance += reward;
    }
    
    // লিস্ট থেকে রিমুভ বা স্ট্যাটাস আপডেট
    global.submissions = global.submissions.filter(s => s.id !== id);
    return res.status(200).json({ success: true });
  }
}
