// Task 10: Async JavaScript & API States

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const PAKISTANI_USERS = [
  { name: 'Ali Hassan', city: 'Karachi' },
  { name: 'Fatima Khan', city: 'Lahore' },
  { name: 'Ahmed Raza', city: 'Islamabad' },
  { name: 'Ayesha Malik', city: 'Karachi' },
  { name: 'Bilal Ahmed', city: 'Faisalabad' },
  { name: 'Zainab Ali', city: 'Multan' },
  { name: 'Usman Tariq', city: 'Peshawar' },
  { name: 'Hira Shahid', city: 'Quetta' },
  { name: 'Omar Farooq', city: 'Rawalpindi' },
  { name: 'Sana Iqbal', city: 'Hyderabad' },
];

export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    // JSONPlaceholder ke data ko Pakistani names se replace karo
    const transformed = data.map((user, index) => ({
      id: user.id,
      name: PAKISTANI_USERS[index % PAKISTANI_USERS.length].name,
      email: `${PAKISTANI_USERS[index % PAKISTANI_USERS.length].name
        .toLowerCase()
        .replace(' ', '.')}@example.pk`,
      city: PAKISTANI_USERS[index % PAKISTANI_USERS.length].city,
    }));

    return { success: true, data: transformed };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};