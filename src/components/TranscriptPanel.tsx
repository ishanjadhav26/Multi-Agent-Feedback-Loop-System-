'use client';
import { useState } from 'react';

interface TranscriptEntry {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  agents?: { agent: string; message: string }[];
}
interface TranscriptPanelProps {
  entries: TranscriptEntry[];
  isProcessing?: boolean;
}

function TranscriptMessage({ entry }: { entry: TranscriptEntry }) {
  const isUser = entry.role === 'user';
  
  if (entry.agents && entry.agents.length > 0) {
    return (
      <>
        {entry.agents.map((agentMsg, idx) => {
          const isT = agentMsg.agent === 'Therapist';
          return (
            <div key={idx} style={{ 
              display:'flex', 
              flexDirection: 'row', 
              gap: 8, 
              marginBottom: 8,
              animation: 'fadeInUp 0.3s ease'
            }}>
              <div style={{ 
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: 14, 
                background: isT ? 'linear-gradient(135deg,#2D68FF,#B439FF)' : 'linear-gradient(135deg,#FDF4FF,#F5F0FF)',
                border: isT ? 'none' : '1px solid #E5E7EB'
              }}>
                {isT ? '🩺' : '🎓'}
              </div>
              <div style={{ maxWidth: '85%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: isT ? '#2D68FF' : '#B439FF', textTransform: 'uppercase' }}>
                  {isT ? 'Therapist' : 'Student'}
                </div>
                <div style={{ 
                  padding: '10px 14px', 
                  borderRadius: '4px 16px 16px 16px', 
                  background: isT ? 'linear-gradient(135deg,#F0F4FF,#F5F0FF)' : '#fff',
                  border: '1px solid #E5E7EB',
                  color: '#111216', 
                  fontSize: 13, 
                  lineHeight: 1.6, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)' 
                }}>
                  {agentMsg.message}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div style={{ display:'flex',flexDirection: isUser ? 'row-reverse' : 'row',gap:8,marginBottom:8 }}>
      <div style={{ width:32,height:32,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,background: isUser ? 'linear-gradient(135deg,#111216,#374151)' : 'linear-gradient(135deg,#2D68FF,#B439FF)' }}>
        {isUser ? '👤' : '🩺'}
      </div>
      <div style={{ maxWidth:'85%',display:'flex',flexDirection:'column',gap:4 }}>
        {!isUser && <div style={{ fontSize:10,fontWeight:700,color:'#2D68FF',textTransform:'uppercase' }}>Therapist</div>}
        <div style={{ padding:'10px 14px',borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',background: isUser ? '#111216' : 'linear-gradient(135deg,#F0F4FF,#F5F0FF)',color: isUser ? '#fff' : '#111216',fontSize:13,lineHeight:1.6,boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
          {entry.content}
        </div>
      </div>
    </div>
  );
}

export default function TranscriptPanel({ entries, isProcessing }: TranscriptPanelProps) {
  return (
    <div style={{ background:'#fff',border:'1px solid #E5E7EB',borderRadius:16,padding:'20px',height:420,overflowY:'auto',display:'flex',flexDirection:'column',gap:16 }}>
      {entries.length === 0 && !isProcessing && (
        <div style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#9CA3AF',textAlign:'center',gap:8 }}>
          <span style={{ fontSize:32 }}>💬</span>
          <p style={{ fontSize:14,fontWeight:500 }}>Therapy session will appear here</p>
          <p style={{ fontSize:12,color:'#D1D5DB' }}>Select a persona and start speaking</p>
        </div>
      )}
      {entries.map((entry, i) => <TranscriptMessage key={i} entry={entry} />)}
      {isProcessing && (
        <div style={{ display:'flex',gap:8,alignItems:'center' }}>
          <div style={{ width:32,height:32,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,background:'linear-gradient(135deg,#2D68FF,#B439FF)' }}>🩺</div>
          <div style={{ padding:'10px 16px',background:'linear-gradient(135deg,#F0F4FF,#F5F0FF)',borderRadius:'4px 16px 16px 16px',display:'flex',gap:5,alignItems:'center' }}>
            {[0,0.2,0.4].map((delay,idx) => (
              <div key={idx} style={{ width:8,height:8,borderRadius:'50%',background:'#2D68FF',animationName:'thinking-dot',animationDuration:'1.2s',animationTimingFunction:'ease-in-out',animationIterationCount:'infinite',animationDelay:`${delay}s` }} />
            ))}
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html:`@keyframes fadeInUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}} />
    </div>
  );
}
