"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testBasketballAPI = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('https://v1.basketball.api-sports.io/timezone', {
        method: 'GET',
        headers: {
          'x-apisports-key': 'c676c73bee2956cd3998d54d147b0bdc'
        }
      });
      
      const data = await response.json();
      console.log('Basketball API Response:', data);
      setResult({ api: 'Basketball API', data, status: response.status });
    } catch (error) {
      console.error('Basketball API Error:', error);
      setResult({ api: 'Basketball API', error: error instanceof Error ? error.message : 'Bilinmeyen hata', status: 'error' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Basketball API Test</h1>
        
        <div style={{ margin: '20px 0' }}>
          <button 
            onClick={testBasketballAPI} 
            disabled={loading}
            style={{
              padding: '15px 30px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Yükleniyor...' : 'Basketball API Test Et'}
          </button>
        </div>

        {result && (
          <div style={{ 
            margin: '20px 0', 
            padding: '15px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}>
            <h3>Sonuç ({result.api}):</h3>
            <p><strong>Status:</strong> {result.status}</p>
            {result.error ? (
              <p style={{ color: 'red' }}><strong>Hata:</strong> {result.error}</p>
            ) : (
              <div>
                <p><strong>Veri:</strong></p>
                <pre style={{ 
                  backgroundColor: '#fff', 
                  padding: '10px', 
                  borderRadius: '3px',
                  overflow: 'auto',
                  maxHeight: '300px'
                }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}    
      </main>
      
    </div>
  );
}
