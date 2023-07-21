export interface DynamicField {
  type:'text' | 'textarea' | 'select'|'radio'|'checkbox';
  label: string;
  name: string;
  value?: any;                               // Value selected or given by the user for the respective field
  options?: { value: any; label: string }[]; // To provide an options for select,checkbox and radio button
  validators?: {                             // To provide validation for the field in a form
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    regexPattern?: string;
  };
}


