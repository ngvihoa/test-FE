import create, { StateCreator } from 'zustand';


type ScanPageStateType = {
    pdfFile: ArrayBuffer | null;
    currentPdfPage: number;
    totalPdfPage: number;

    clearPdf: () => void;
    setPdf: (pdfFile: ArrayBuffer) => void;

    setTotalPdfPage: (totalPage: number) => void;

    nextPage: () => void;
    prevPage: () => void;
};

const ScanPageState: StateCreator<
    ScanPageStateType,
    [],
    [],
    ScanPageStateType
> = (set, get) => ({
    pdfFile: null,
    currentPdfPage: 1,
    totalPdfPage: 0,

    clearPdf() {
        set({ pdfFile: null, totalPdfPage: 0, currentPdfPage: 1 });
    },
    setPdf(pdfFile) {
        set({ pdfFile, currentPdfPage: 1 });
    },

    setTotalPdfPage(totalPage) {
        set({ totalPdfPage: totalPage });
    },

    nextPage() {
        if (get().currentPdfPage >= get().totalPdfPage) {
            return;
        }
        set({ currentPdfPage: get().currentPdfPage + 1 });
    },

    prevPage() {
        if (get().currentPdfPage <= 1) {
            return;
        }

        set({ currentPdfPage: get().currentPdfPage - 1 });
    },

});

type authstatetype = {
    user: {
        accessToken: string;
    } | null;
    loginUser: (accessToken: string) => void;
    logoutUser: () => void;
};

const useStore = create<ScanPageStateType>((...a) => ({
    ...ScanPageState(...a),
}));

export default useStore;
