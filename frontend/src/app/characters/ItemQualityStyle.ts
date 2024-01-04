export const itemQualityCheckFunction = (quality:number, type:'background'|'font') => {
  let result = '';

  if(type === 'background') {
    if(quality === 100) {
      result = 'bg-[#f9ae00] dark:bg-[#eba70c]';
    } else if (quality >= 90) {
      result = 'bg-[#8045dd]';
    } else if (quality >= 70) {
      result = 'bg-[#2AB1F6]';
    } else if (quality >= 30) {
      result = 'bg-[#A0E71C]';
    } else if (quality >= 10) {
      result = 'bg-[#FFE81D] dark:bg-[#d9c514]';
    } else if (quality >= 1) {
      result = 'bg-[#FF7F37]';
    } else if (quality === 0) {
      result = 'bg-[#CBCDD4]';
    }
  } else if ('font') {
    if(quality === 100) {
      result = 'text-[#f9ae00] dark:text-[#eba70c]';
    } else if (quality >= 90) {
      result = 'text-[#8045dd]';
    } else if (quality >= 70) {
      result = 'text-[#2AB1F6]';
    } else if (quality >= 30) {
      result = 'text-[#A0E71C]';
    } else if (quality >= 10) {
      result = 'text-[#FFE81D] dark:text-[#d9c514]';
    } else if (quality >= 1) {
      result = 'text-[#FF7F37]';
    } else if (quality === 0) {
      result = 'text-[#CBCDD4]';
    }
  }

  return result;
}
