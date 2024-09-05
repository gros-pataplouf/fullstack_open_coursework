export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy'
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }
  
  export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
  }
  
  export interface InitialForm {
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
  }

  export type DiaryForm = Omit<DiaryEntry, "id">;

  export interface FormProps {
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    diaryEntries: DiaryEntry[];
    setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  }