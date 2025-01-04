// 現在の日本時間を MySQL DATETIME フォーマットで返す関数

export function getDateTime() {
    const now = new Date();
    const offset = 9 * 60;
    const japanTime = new Date(now.getTime() + offset * 60 * 1000);
    // フォーマット (YYYY-MM-DD HH:MM:SS)
    const formattedDateTime = japanTime.toISOString().replace('T', ' ').substring(0, 19);
    return formattedDateTime;
}
