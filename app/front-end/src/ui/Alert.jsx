import React from "react";

export function ErrorAlert({children}) {
    return <div className="alert alert-danger">
        {children}
    </div>
}

export function SuccessAlert({children}) {
    return <div className="alert alert-success">
        {children}
    </div>
}