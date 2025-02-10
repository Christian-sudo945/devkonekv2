export const tempFunctions = {
  messages: {
    fetchMessages: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, sender: "User 1", content: "Hello!", timestamp: new Date() },
            { id: 2, sender: "User 2", content: "Hi there!", timestamp: new Date() }
          ]);
        }, 1000);
      });
    },
    sendMessage: async (message: string) => {
      // Simulate message sending
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 500);
      });
    }
  },

  codeHelp: {
    fetchSnippets: async () => {
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, title: "React Hook", code: "const [state, setState] = useState()" },
            { id: 2, title: "Array Map", code: "array.map(item => item)" }
          ]);
        }, 1000);
      });
    },
    submitQuestion: async (question: string) => {
      // Simulate question submission
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 500);
      });
    }
  },

  // Developers section helpers
  developers: {
    fetchDevelopers: async () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            /* Your existing developers data */
          ]);
        }, 1000);
      });
    },
    filterDevelopers: async (criteria: any) => {
      // Simulate filtering
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            /* Filtered developers data */
          ]);
        }, 500);
      });
    }
  }
};
