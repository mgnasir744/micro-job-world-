import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [screenshot, setScreenshot] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'ফেসবুক পেজে লাইক ও শেয়ার করুন', link: 'https://facebook.com/example', reward: 5 },
    { id: 2, 'title': 'ইউটিউব চ্যানেল সাবস্ক্রাইব করুন', link: 'https://youtube.com/example', reward: 10 }
  ]);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) router.push('/');
    else setUser(JSON.parse(loggedInUser));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setScreenshot(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const submitTask = async (taskId, reward) => {
    if (!screenshot) return alert('দয়া করে কাজের স্ক্রিনশট আপলোড করুন!');
    
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, taskId, screenshot, reward })
    });

    if (res.ok) {
      alert('টাস্ক সফলভাবে জমা দেওয়া হয়েছে! অ্যাডমিন ভেরিফিকেশনের জন্য অপেক্ষা করুন।');
      setScreenshot('');
    }
  };

  if (!user) return <p className="text-center mt-10">লোড হচ্ছে...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">স্বাগতম, {user.username}!</h1>
            <p className="text-sm text-green-600 font-semibold">আপনার ব্যালেন্স: ৳{user.balance || 0}</p>
          </div>
          <button onClick={() => { localStorage.clear(); router.push('/'); }} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">লগআউট</button>
        </div>

        <div className="bg-yellow-50 p-3 rounded-md mb-6 border border-yellow-200">
          <p className="text-xs text-yellow-800">🔗 আপনার রেফারেল লিংক: <span className="font-mono font-bold">https://yourdomain.com/?ref={user.username}</span></p>
        </div>

        <h2 className="text-lg font-bold mb-4 text-gray-700">উপলব্ধ কাজ সমূহ:</h2>
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="border p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50">
              <div>
                <p className="font-semibold text-gray-800">{task.title}</p>
                <a href={task.link} target="_blank" rel="noreferrer" className="text-blue-500 underline text-sm block my-1">এখানে ক্লিক করে কাজ করুন</a>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">পুরস্কার: ৳{task.reward}</span>
              </div>
              <div className="mt-3 md:mt-0 flex flex-col items-end gap-2">
                <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs" />
                <button onClick={() => submitTask(task.id, task.reward)} className="bg-green-600 text-white text-xs px-4 py-2 rounded-md hover:bg-green-700">প্রুফ জমা দিন</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
