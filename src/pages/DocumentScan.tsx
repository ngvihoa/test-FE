import { UploadSquareOutline, Trash, FolderAlert } from 'iconoir-react';
import { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import useStore from '../stores';
import '../assets/css/ball-fussion.css';

const DocumentScan = () => {
    const pdfFile = useStore((store) => store.pdfFile);
    const setPdf = useStore((store) => store.setPdf);
    const clearPdf = useStore((store) => store.clearPdf);
    const currentPdfPage = useStore((store) => store.currentPdfPage);
    const totalPdfPage = useStore((store) => store.totalPdfPage);
    const setTotalPdfPage = useStore((store) => store.setTotalPdfPage);
    const prevPage = useStore((store) => store.prevPage);
    const nextPage = useStore((store) => store.nextPage);

    const [pdfBase64, setPdfBase64] = useState('');
    const [state, setState] = useState(false);  // check if found
    const [waiting, setWaiting] = useState(false); // check if waiting
    // data = [];
    const [data, setData] = useState<string[]>([]); // delete when have api

    const onFileDrop = useCallback(async (acceptedFile: File[]) => {
        if (!acceptedFile[0]) {
            return;
        }
        const file = await acceptedFile[0].arrayBuffer();
        const fileReader = new FileReader();
        fileReader.readAsDataURL(acceptedFile[0]);
        fileReader.onload = () => setPdfBase64(fileReader.result as string);
        setPdf(file);
    }, []);

    const onPdfLoadSuccess = useCallback(
        ({ numPages }: { numPages: number }) => {
            setTotalPdfPage(numPages);
        },
        [],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFileDrop,
        maxFiles: 1,
        accept: { 'application/pdf': ['.pdf'] },
    });

    const extractFile = useCallback(
        async function ExtractFile() {
            if (pdfBase64 === '') {
                return;
            }
            //setData(['100/DFD', '1234/faf', '8r32/fasfd', 'csjbvalvk', 'akdbnvkhab', 'bakbva', 'bkvjbak']); // delete when have api
            else {
                const results = await fetch(
                    'http://localhost:8888/api/getDoc',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            file: pdfBase64,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Origin': 'http://localhost:5173'
                        }
                    }
                );
                const tmp = await results.json();
                setData(tmp.result);
                setWaiting(false);
                setState(true);
                
            }
        },
        [pdfBase64]
    );

    return (
        <div className="flex flex-1 border-spacing-1 flex-col overflow-x-auto">
            <div className="flex justify-between px-6 pb-4 pt-6">
                <h1 className="text-xl font-bold text-slate-600 flex items-center">
                    {' '}
                    Quét tài liệu
                </h1>
                <button
                    className="rounded-lg bg-red-500 px-5 text-white shadow-lg"
                    onClick={() => {
                        setWaiting(true);
                        extractFile();
                    }}
                >
                    QUÉT
                </button>
                <Trash
                    className="box-content cursor-pointer self-end rounded-md border p-2 text-red-600 shadow-lg transition-colors hover:bg-slate-200 active:bg-red-500 active:text-white"
                    onClick={() => {
                        {
                            clearPdf();
                            setData([]); 
                            setPdfBase64('');
                            setState(false);
                            setWaiting(false);
                        }
                    }} //   - delete setData and setPDFBase64 when have api
                ></Trash>
            </div>
            <div className="small-scrollbar flex grow flex-col space-y-2 space-x-2 overflow-y-auto px-6 pb-6 lg:flex-row">
                <div className="flex flex-1">
                    {pdfFile === null ? (
                        <div
                            className={`flex flex-1 cursor-pointer flex-col items-center justify-center space-y-8 rounded-xl border-4 border-dashed hover:bg-slate-200 ${
                                isDragActive ? 'bg-slate-200' : ''
                            } p-8`}
                            {...getRootProps()}
                        >
                            <UploadSquareOutline className="h-16 w-16 text-slate-500" />
                            <input {...getInputProps()} />
                            {!isDragActive ? (
                                <p className="text-center">
                                    <strong>Chọn tài liệu</strong> hoặc kéo thả
                                    tài liệu vào đây
                                </p>
                            ) : (
                                <p>Thả tài liệu ở đây...</p>
                            )}
                        </div>
                    ) : (
                        <Document
                            file={pdfFile}
                            onLoadSuccess={onPdfLoadSuccess}
                            className="small-scrollbar relative flex grow overflow-x-auto"
                            // loading={<div className='flex justify-center items-center'>Đang tải...</div>}
                        >
                            <Page
                                pageNumber={currentPdfPage}
                                className="small-scrollbar flex grow justify-center overflow-y-auto rounded-md border shadow-lg"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 space-x-2 rounded-md bg-white text-slate-500 opacity-25 shadow-md transition hover:opacity-100">
                                <button
                                    type="button"
                                    disabled={currentPdfPage <= 1}
                                    onClick={prevPage}
                                    className="p-3 transition hover:bg-slate-50 active:bg-slate-100 disabled:opacity-20"
                                >
                                    {'<'}
                                </button>
                                <span className="px-1">
                                    {currentPdfPage} trong {totalPdfPage}
                                </span>
                                <button
                                    type="button"
                                    disabled={currentPdfPage >= totalPdfPage}
                                    onClick={nextPage}
                                    className="p-3 transition hover:bg-slate-50 active:bg-slate-100 disabled:opacity-20"
                                >
                                    {'>'}
                                </button>
                            </div>
                        </Document>
                    )}
                </div>
                <div className="flex-1 ">
                    {waiting && (
                        <div className="flex items-center justify-center pt-2 h-full">
                            <div className="la-ball-fussion">
                                <div />
                                <div />
                                <div />
                                <div />
                            </div>
                        </div>
                    )}
                    {(state && data.length === 0) ? (
                        <div className="flex h-full w-full flex-col items-center justify-center space-y-8">
                            <FolderAlert className="h-16 w-16 text-slate-500" />
                            <p>Không tìm thấy tài liệu liên quan nào</p>
                        </div>
                    ) : (
                        <div className="space-y-3 h-full overflow-auto px-2">
                            {data.map((doc) => (
                                <div className="flex rounded-3xl h-24 w-full bg-slate-50 text-black-500 font-semibold shadow-xl">
                                    <div className='w-24 rounded-l-3xl flex items-center justify-center text-white h-full bg-blue-400 mr-3'>.PDF</div>
                                    <div className='px-4 py-2'>{doc}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentScan; 
