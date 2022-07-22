import React from 'react';

const NavIcon = ({
    children,
    tooltip,
}: {
    children: JSX.Element;
    tooltip?: string;
}) => {
    return (
        <div
            title={tooltip}
            className="rounded-xl p-3 bg-slate-700 hover:bg-slate-400 active:bg-slate-300 transition-colors duration-200"
        >
            {children}
        </div>
    );
};

export default NavIcon;
