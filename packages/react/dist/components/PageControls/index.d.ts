interface Props {
    className?: string;
    currentPage: number;
    lastPage: number;
    onChange: (nextPage: number) => void;
}
export declare const PageControls: ({ className, currentPage, lastPage, onChange }: Props) => JSX.Element;
export {};
