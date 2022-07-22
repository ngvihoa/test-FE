import './App.css';
import Nav from './containers/Nav';
import useStore from './stores';
import Login from './pages/Login';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import DocumentScan from './pages/DocumentScan';
// import DocumentScan2 from './pages/DocumentScan2';
import DocumentSearch from './pages/DocumentSearch';

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: 'http://localhost:8000/trpc',
        }),
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="login" element={<Login />} />
                            <Route element={<Main />}>
                                <Route path="scan" element={<DocumentScan />} />
                                {/* <Route
                                    path="search"
                                    element={<DocumentSearch />}
                                /> */}
                                <Route
                                    path="*"
                                    element={<Navigate to="scan" replace />}
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
