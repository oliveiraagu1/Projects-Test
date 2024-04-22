import { ComponentProps } from "react";

interface TableProps extends ComponentProps<'table'> { }

export const Table = ({ ...props }: TableProps) => {
    return (
        <div className="className='border border-white/10 rounded-lg">
            <table className='w-full' {...props} />
        </div>
    )
}