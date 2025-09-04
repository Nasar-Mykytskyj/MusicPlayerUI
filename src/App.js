import React from 'react';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Arial, sans-serif',
          borderRadius: 8, // Set your desired global border-radius in pixels
          hoverBgColor: 'rgba(255, 255, 255, 0.1)', // Example hover background color
          activeBgColor: 'rgba(255, 255, 255, 0.2)', // Example active background color
        },
        components: {
          Splitter: {
            splitBarSize: 10,
            splitBarDraggableSize: 20,
          },
        },
      }}
      componentSize="large" // default size for all components
    >
      {/* ...your app components... */}
    </ConfigProvider>
  );
}

export default App;