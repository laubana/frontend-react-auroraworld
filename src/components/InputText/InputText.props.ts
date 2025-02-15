export interface InputTextProps {
  label?: string;
  placeholder?: string;
  text?: string;
  setText?: (text: string) => void;
  error?: string;
}
