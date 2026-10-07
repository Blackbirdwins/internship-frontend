export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const formatCurrency = (n) =>
  `Rs ${Number(n).toLocaleString()}`;