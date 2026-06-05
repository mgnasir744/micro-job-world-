global.submissions = global.submissions || [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, taskId, screenshot, reward } = req.body;
    const newSubmission = { id: Date.now(), username, taskId, screenshot, reward, status: 'pending' };
    global.submissions.push(newSubmission);
    return res.status(200).json({ success: true });
  }
}
