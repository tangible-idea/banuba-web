import { createClient } from '@supabase/supabase-js'

// Supabase 설정
const supabaseUrl = "https://vrfigkfbldpcnykdpzjg.supabase.co"; // 예: https://xyzcompany.supabase.co
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZmlna2ZibGRwY255a2RwempnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MzE3NDMsImV4cCI6MjAzNDAwNzc0M30.F5KPVP1lUwHg1_tVvlP82Le_065jRHlsSiiHJDaeDaU"; // 예: public-anon-key
const supabase = createClient(supabaseUrl, supabaseKey);

// 버킷 이름
const bucketName = 'images'; // 예: images

export const uploadImage= async(image, folderName) => {
  if (!image) {
    console.log('Please select a file.');
    return;
  }

  const fileName = createFileName("png");
  console.log(fileName);

  try {
    // 파일 업로드
    const { data, error } = await supabase.storage.from(bucketName).upload(`${folderName}/${fileName}`, image);

    if (error) {
      throw error;
    }

    // 성공 시 결과 표시
    console.log(`File uploaded: ${data.Key}`);
  } catch (error) {
    console.error('Error uploading file:', error);document.getElementById('result').innerText = `Error uploading file: ${error.message}`;
  }
}


function getFormattedDateTime() {
  const now = new Date();
  
  // 년도 가져오기
  const year = now.getFullYear();
  
  // 월 가져오기 (월 이름)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[now.getMonth()];
  
  // 일 가져오기
  const day = String(now.getDate()).padStart(2, '0');
  
  // 시간, 분, 초 가져오기
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // 포맷된 문자열 생성
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

function createFileName(extension) {
  const dateTimeString = getFormattedDateTime();
  return `${dateTimeString}.${extension}`;
}