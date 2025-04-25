interface DateFormatOptions {
    includeTime?: boolean;
    timeFormat?: '12h' | '24h';
    showSeconds?: boolean;
    locale?: string;
  }
  
  /**
   * Format date sử dụng Intl.DateTimeFormat
   * @param date - Date object hoặc timestamp
   * @param options - Tùy chọn định dạng
   * @returns Chuỗi đã format
   */
  export function formatDate(
    date: Date | number | string,
    options: DateFormatOptions = {}
  ): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date provided to formatDate:', date);
      return 'Invalid date';
    }
    
    const {
      includeTime = false,
      timeFormat = '24h',
      showSeconds = false,
      locale = 'en-US'
    } = options;
    
    // Tạo options cho Intl.DateTimeFormat
    const formatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    
    if (includeTime) {
      formatOptions.hour = timeFormat === '12h' ? 'numeric' : '2-digit';
      formatOptions.minute = '2-digit';
      formatOptions.hour12 = timeFormat === '12h';
      
      if (showSeconds) {
        formatOptions.second = '2-digit';
      }
    }
    
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  }
  
  /**
   * Format relative time (cách đây bao lâu)
   * @param date - Date object hoặc timestamp
   * @param locale - Locale để định dạng
   * @returns Chuỗi thời gian tương đối
   */
  export function formatRelativeTime(
    date: Date | number | string,
    locale: string = 'en-US'
  ): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date provided to formatRelativeTime:', date);
      return 'Invalid date';
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    // Tạo relative time formatter
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    
    // Calculate the appropriate time unit
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  }
  
  /**
   * Format date range
   * @param startDate - Ngày bắt đầu
   * @param endDate - Ngày kết thúc
   * @param locale - Locale để định dạng
   * @returns Chuỗi khoảng thời gian
   */
  export function formatDateRange(
    startDate: Date | number | string,
    endDate: Date | number | string,
    locale: string = 'en-US'
  ): string {
    const startObj = startDate instanceof Date ? startDate : new Date(startDate);
    const endObj = endDate instanceof Date ? endDate : new Date(endDate);
    
    if (isNaN(startObj.getTime()) || isNaN(endObj.getTime())) {
      console.error('Invalid date range:', { startDate, endDate });
      return 'Invalid date range';
    }
    
    // Nếu cùng ngày
    if (startObj.toDateString() === endObj.toDateString()) {
      return `${formatDate(startObj, { locale })}`;
    }
    
    // Nếu cùng tháng và năm
    if (
      startObj.getMonth() === endObj.getMonth() &&
      startObj.getFullYear() === endObj.getFullYear()
    ) {
      return `${startObj.getDate()} - ${formatDate(endObj, { locale })}`;
    }
    
    // Nếu cùng năm
    if (startObj.getFullYear() === endObj.getFullYear()) {
      const startFormat = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });
      return `${startFormat.format(startObj)} - ${formatDate(endObj, { locale })}`;
    }
    
    // Khác năm
    return `${formatDate(startObj, { locale })} - ${formatDate(endObj, { locale })}`;
  }