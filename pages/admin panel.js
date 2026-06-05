import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const [submissions, setSubmissions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'admin') {
      router.push('/');
    } else {
      fetchSubmissions();
    }
  }, []);

  const fetchSubmissions = async () => {
    const res = await fetch('/api/admin');
    const data = await res.json();
    setSubmissions(data.submissions || []);
  };

  const handleAction = async (id, username, reward, action) => {
    await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, username, reward, action })
    });
    alert(`টাস্কটি ${action === 'approve' ? 'অ্যাপ্রুভ' : 'রিজেক্ট'} করা হয়েছে!`);
    fetchSubmissions();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">Super Admin & Team Dashboard</h1>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm">
                <th className="p-4">ইউজার</th>
                <th className="p-4">টাস্ক আইডি</th>
                <th className="p-4">স্ক্রিনশট প্রুফ</th>
                <th className="p-4">অ্যামাউন্ট</th>
                <th className="p-4">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {submissions.map((sub) => (
                <tr key={sub.id} className="text-sm">
                  <td className="p-4">{sub.username}</td>
                  <td className="p-4">#{sub.taskId}</td>
                  <td className="p-4">
                    <img src={sub.screenshot} alt="Proof" className="w-24 h-24 object-cover rounded border border-gray-600 cursor-pointer" onClick={() => window.open(sub.screenshot)} />
                  </td>
                  <td className="p-4 text-green-400 font-bold">৳{sub.reward}</td>
                  <td className="p-4 space-x-2">
                    <button onClick={() => handleAction(sub.id, sub.username, sub.reward, 'approve')} className="bg-green-600 px-3 py-1 rounded text-white text-xs hover:bg-green-700">Approve</button>
                    <button onClick={() => handleAction(sub.id, sub.username, sub.reward, 'reject')} className="bg-red-600 px-3 py-1 rounded text-white text-xs hover:bg-red-700">Reject</button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">কোনো পেন্ডিং কাজ নেই।</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
