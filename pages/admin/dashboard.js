import React from 'react';

export default function AdminDashboard() {
  // Mock Data from Reference Image
  const stats = [
    { label: 'Total Users', value: '12,540', sub: '+ 256 Today', color: '#dc2626', icon: '👥' },
    { label: 'Active Users', value: '1,258', sub: 'Live Now', color: '#dc2626', icon: '👤' },
    { label: 'Total Jobs', value: '320', sub: '45 Active', color: '#dc2626', icon: '💼' },
    { label: 'Proof Submitted Today', value: '785', sub: '+65 Today', color: '#dc2626', icon: '📄' },
    { label: 'Total User Balance', value: '৳ 1,245,680', sub: 'All User Balance', color: '#dc2626', icon: '💳' },
    { label: 'Withdraw Requests', value: '৳ 86,750', sub: '25 Pending', color: '#dc2626', icon: '📤' },
    { label: 'Admin Revenue', value: '৳ 245,680', sub: 'Total Earnings', color: '#dc2626', icon: '📈' },
    { label: 'Total Paid', value: '৳ 158,930', sub: 'This Month', color: '#dc2626', icon: '✅' },
  ];

  const proofs = [
    { user: '018******23', title: 'Like Facebook Page', time: '28 May, 2025 10:30 AM', status: 'Pending' },
    { user: '017******45', title: 'Visit Website', time: '28 May, 2025 10:25 AM', status: 'Pending' },
    { user: '019******67', title: 'Subscribe YouTube', time: '28 May, 2025 10:20 AM', status: 'Pending' },
    { user: '016******89', title: 'Follow Instagram', time: '28 May, 2025 10:15 AM', status: 'Pending' },
    { user: '015******10', title: 'Share Post', time: '28 May, 2025 10:10 AM', status: 'Pending' },
  ];

  const withdraws = [
    { user: '018******23', amount: '৳ 500', method: 'bKash', time: '28 May, 10:35 AM', status: 'Pending' },
    { user: '017******45', amount: '৳ 1,000', method: 'Nagad', time: '28 May, 10:32 AM', status: 'Pending' },
    { user: '019******67', amount: '৳ 300', method: 'Rocket', time: '28 May, 10:30 AM', status: 'Pending' },
    { user: '016******89', amount: '৳ 700', method: 'bKash', time: '28 May, 10:28 AM', status: 'Pending' },
    { user: '015******10', amount: '৳ 450', method: 'Nagad', time: '28 May, 10:25 AM', status: 'Pending' },
  ];

  const quickActions = [
    { label: 'Add New Job', desc: 'Create a new micro job', icon: '➕' },
    { label: 'Manage Users', desc: 'View and manage users', icon: '👥' },
    { label: 'Verify Proofs', desc: 'Review submitted proofs', icon: '📋' },
    { label: 'Withdraw Queue', desc: 'Process withdraw requests', icon: '📥' },
    { label: 'System Settings', desc: 'Configure system settings', icon: '⚙️' },
  ];

  // Inline Pure CSS Styles for absolute safety
  const styles = {
    wrapper: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' },
    sidebar: { width: '260px', backgroundColor: '#dc2626', color: '#ffffff', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    main: { flex: 1, padding: '24px', overflowY: 'auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '15px 24px', borderRadius: '8px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' },
    grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '24px' },
    gridQuick: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '24px' },
    card: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' },
    iconWrapper: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#dc2626', flexShrink: 0 },
    sectionBox: { backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
    th: { padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: '600' },
    td: { padding: '12px', borderBottom: '1px solid #f1f5f9', color: '#334155' },
    badgePending: { backgroundColor: '#fff7ed', color: '#ea580c', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' },
    btnViewAll: { border: '1px solid #dc2626', color: '#dc2626', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', background: 'none', cursor: 'pointer' },
  };

  return (
    <div style={styles.wrapper} className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar */}
      <aside style={styles.sidebar} className="w-64 bg-red-600 text-white p-5 flex flex-col justify-between hidden md:flex">
        <div>
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>BDzoon</h1>
            <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>Micro-Job Platform</p>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ backgroundColor: '#ffffff', color: '#dc2626', padding: '12px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>📊 Dashboard</div>
            <div style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer' }}>👥 User Management</div>
            <div style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer' }}>💼 Job Management</div>
            <div style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer' }}>📝 Proof Verification</div>
            <div style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer' }}>📤 Withdraw Requests</div>
            <div style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer' }}>💳 Transactions</div>
            <div style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer' }}>⚙️ System Settings</div>
          </nav>
        </div>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '12px' }}>
          <strong>BDzoon App</strong><br /><span style={{ opacity: 0.7 }}>Version 1.0.0</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={styles.main} className="flex-1 p-6 overflow-y-auto">
        
        {/* Top Header */}
        <header style={styles.header} className="flex justify-between items-center bg-white p-4 rounded-lg mb-6 shadow-sm">
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Dashboard Overview</h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Home &gt; Dashboard</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '6px' }}>📅 28 May, 2025</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dc2626', color: '#fff', display: 'flex', alignItems: 'center', justifycontent: 'center', fontWeight: 'bold', fontSize: '14px' }}>A</div>
              <div className="hidden sm:block"><span style={{ fontSize: '14px', fontWeight: '600', display: 'block' }}>Admin</span><span style={{ fontSize: '11px', color: '#64748b' }}>Super Admin</span></div>
            </div>
          </div>
        </header>

        {/* 8 Stats Grid */}
        <section style={styles.grid4} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {stats.map((item, index) => (
            <div key={index} style={styles.card} className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4 shadow-sm">
              <div style={styles.iconWrapper}>{item.icon}</div>
              <div>
                <span style={{ fontSize: '13px', color: '#64748b', display: 'block', marginBottom: '2px' }}>{item.label}</span>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', display: 'block' }}>{item.value}</span>
                <span style={{ fontSize: '12px', color: item.sub.includes('+') || item.sub.includes('Live') ? '#16a34a' : '#64748b', fontWeight: '500' }}>{item.sub}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Job Status Overview */}
        <section style={styles.sectionBox} className="bg-white p-6 rounded-xl border border-slate-200 mb-6">
          <div style={styles.sectionHeader}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Job Status Overview</h3>
            <button style={styles.btnViewAll}>View All Jobs</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '24px' }}>💼</div>
                <div><span style={{ fontSize: '20px', fontWeight: '700', display: 'block' }}>45</span><span style={{ fontSize: '12px', color: '#64748b' }}>Active Jobs</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '24px' }}>⏳</div>
                <div><span style={{ fontSize: '20px', fontWeight: '700', display: 'block' }}>12</span><span style={{ fontSize: '12px', color: '#64748b' }}>Pending Jobs</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '24px' }}>✅</div>
                <div><span style={{ fontSize: '20px', fontWeight: '700', display: 'block' }}>263</span><span style={{ fontSize: '12px', color: '#64748b' }}>Completed Jobs</span></div>
              </div>
            </div>
            {/* Visual Indicator Block */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '10px solid #dc2626', borderTopColor: '#ea580c', borderRightColor: '#16a34a', transform: 'rotate(45deg)' }}></div>
              <div style={{ fontSize: '13px', color: '#475569' }}>
                <div><span style={{ inlineSize: '10px', blockSize: '10px', backgroundColor: '#dc2626', display: 'inline-block', marginRight: '6px', borderRadius: '50%' }}></span>Active: 45 (14.06%)</div>
                <div><span style={{ inlineSize: '10px', blockSize: '10px', backgroundColor: '#ea580c', display: 'inline-block', marginRight: '6px', borderRadius: '50%' }}></span>Pending: 12 (3.75%)</div>
                <div><span style={{ inlineSize: '10px', blockSize: '10px', backgroundColor: '#16a34a', display: 'inline-block', marginRight: '6px', borderRadius: '50%' }}></span>Completed: 263 (82.19%)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Tables Grid */}
        <section style={styles.grid2} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Recent Proof Submissions */}
          <div style={styles.sectionBox} className="bg-white p-6 rounded-xl border border-slate-200">
            <div style={styles.sectionHeader}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Recent Proof Submissions</h3>
              <button style={styles.btnViewAll}>View All</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>User</th>
                    <th style={styles.th}>Job Title</th>
                    <th style={styles.th}>Submitted At</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {proofs.map((row, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{row.user}</td>
                      <td style={styles.td}>{row.title}</td>
                      <td style={styles.td}>{row.time}</td>
                      <td style={styles.td}><span style={styles.badgePending}>{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Withdraw Requests */}
          <div style={styles.sectionBox} className="bg-white p-6 rounded-xl border border-slate-200">
            <div style={styles.sectionHeader}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Recent Withdraw Requests</h3>
              <button style={styles.btnViewAll}>View All</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>User</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Method</th>
                    <th style={styles.th}>Request Time</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdraws.map((row, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{row.user}</td>
                      <td style={styles.td}>{row.amount}</td>
                      <td style={styles.td}>{row.method}</td>
                      <td style={styles.td}>{row.time}</td>
                      <td style={styles.td}><span style={styles.badgePending}>{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section style={styles.sectionBox} className="bg-white p-6 rounded-xl border border-slate-200 mb-6">
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px', marginTop: 0 }}>Quick Actions</h3>
          <div style={styles.gridQuick} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickActions.map((action, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fff' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px', color: '#dc2626' }}>{action.icon}</div>
                <span style={{ fontSize: '14px', fontWeight: '600', display: 'block', color: '#1e293b', marginBottom: '4px' }}>{action.label}</span>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>{action.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* System & Summary Info Grid */}
        <section style={styles.grid2} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Platform Summary */}
          <div style={styles.sectionBox} className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '12px', marginTop: 0 }}>Platform Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Users</span><strong>12,540</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Active Users (Now)</span><strong>1,258</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Jobs</span><strong>320</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Paid</span><strong>৳ 2,456,780</strong></div>
            </div>
          </div>

          {/* System Information */}
          <div style={styles.sectionBox} className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '12px', marginTop: 0 }}>System Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>System Name</span><strong>BDzoon Micro-Job Platform</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>PHP Version</span><strong>8.2.0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Database</span><strong>MySQL</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Status</span><span style={{ color: '#16a34a', fontWeight: '600' }}>● All Systems Operational</span></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginTop: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <span>Copyright © 2026 <strong>BDzoon</strong>. All rights reserved.</span>
          <span>Made with ❤️ by <strong>BDzoon Team</strong></span>
        </footer>

      </main>
    </div>
  );
}
