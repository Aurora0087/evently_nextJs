const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="center h-screen">
            {children}
        </div>
    )
}

export default Layout