export function formatRelativeTime(date: Date | string | null): string {
  if (!date) return "";
  
  // Create a Date object. If it's a string from MySQL, it might not have 'Z' appended,
  // causing it to be interpreted in local time instead of UTC.
  // Assuming database stores dates in UTC.
  let d = new Date(date);
  if (typeof date === 'string' && !date.endsWith('Z') && !date.includes('+') && !date.includes('-')) {
    // If it looks like '2023-10-01T12:00:00.000', treat it as UTC
    d = new Date(date + 'Z');
  }

  const now = new Date();
  // Sometimes server time and DB time can be slightly out of sync or timezones mess up
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  // If time is slightly in the future (due to sync issues) or very recent
  if (diffInSeconds <= 0 || diffInSeconds < 60) {
    return "刚刚";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}天前`;
  }

  // Fallback to YYYY-MM-DD for > 30 days
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Simple success/error response formatters for API
export function successResponse<T>(data: T, message?: string) {
  return {
    success: true,
    data,
    ...(message && { message }),
  };
}

export function errorResponse(error: string, message: string, status = 400) {
  return Response.json(
    {
      success: false,
      error,
      message,
    },
    { status }
  );
}
