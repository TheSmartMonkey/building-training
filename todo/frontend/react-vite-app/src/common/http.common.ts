export default class HttpCommon {
  async get(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async post<T>(url: string, data: T) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const newData = await response.json();
      console.log('New data created:', newData);
      return newData;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  }
}
