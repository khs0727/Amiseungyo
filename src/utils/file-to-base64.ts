export default async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 파일 읽기가 완료되었을 때 호출되는 함수
    reader.onloadend = () => {
      resolve(reader.result as string); // 파일 내용을 base64 문자열로 반환
    };

    reader.onerror = reject;

    reader.readAsDataURL(file); // 파일을 DataURL 형식으로 읽기 시작
  });
}
