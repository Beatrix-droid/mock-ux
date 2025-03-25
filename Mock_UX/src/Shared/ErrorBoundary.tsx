import React from "react";

interface Props{
    children: React.ReactNode;
    fallback:React.ReactNode;
}

interface State{
    hasError:boolean;
}

class ErrorBoundary extends React.Component<Props, State>{

    state={hasError:false}


    static getDerivedStateFromError(){
        return {hasError:true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo) //ideally send error log to server
    }

    render(){
        if(this.state.hasError){
            return this.props.fallback;
        }
        return this.props.children
    }
}

export default ErrorBoundary;