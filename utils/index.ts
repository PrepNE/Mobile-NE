import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatRelativeDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isToday(date)) {
    const diff = formatDistanceToNow(date, { addSuffix: true });

    if (diff.includes('less than a minute')) return '1 sec ago';

    return diff
      .replace('about ', '')
      .replace('less than ', '')
      .replace('minutes ago', 'min ago')
      .replace('minute ago', '1 min ago')
      .replace('hours ago', 'hours ago')
      .replace('hour ago', '1 hour ago');
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getInitials = (input: string) => {
    if (input.includes(' ')) {
        const nameParts = input.trim().split(' ');
        if (nameParts.length > 1) {
            return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        } else {
            return (nameParts[0][0] + (nameParts[0][1] || '')).toUpperCase();
        }
    }
 
    const emailName = input.split('@')[0];
    if (emailName.length >= 2) {
        return (emailName[0] + emailName[1]).toUpperCase();
    }
    return emailName[0] ? emailName[0].toUpperCase() : '';
};

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: amount >= 10000 ? 'compact' : 'standard', 
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(amount);
};

  export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  export const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      food: 'restaurant',
      transport: 'car',
      shopping: 'bag',
      entertainment: 'game-controller',
      health: 'medical',
      utilities: 'home',
      education: 'school',
      other: 'ellipsis-horizontal',
    };
    return iconMap[category?.toLowerCase()] || 'wallet';
  };
