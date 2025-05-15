"use client";

interface PaginateProps {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({
  page,
  totalPage,
  onPageChange,
}) => {
  if (page < 1) page = 1;
  if (page > totalPage) page = totalPage;
  if (totalPage > 1) {
    return (
      <div className="flex justify-center items-center divide-x-[1px] divide-slate-50 mt-5">
        <button
          className={`w-4 h-4  p-3 flex items-center justify-center rounded-l-md h ${
            page === 1
              ? "cursor-not-allowed bg-slate-200 text-slate-400"
              : "bg-slate-400 text-white over:bg-slate-500 duration-200 transition-colors ease-in-out"
          }`}
        >
          <p className="text-sm  flex items-center justify-center">
            <span className="ic--sharp-navigate-before"></span>
          </p>
        </button>
        {Array.from({ length: totalPage || 0 }, (_, i) =>
          page !== i + 1 ? (
            <button
              key={i + 1}
              className="w-4 h-4 bg-slate-400 p-3 flex items-center justify-center text-white hover:bg-slate-500 duration-200 transition-colors ease-in-out"
              onClick={() => {
                if (page !== 1) onPageChange(i + 1);
              }}
            >
              <p className="text-sm flex items-center justify-center">
                {i + 1}
              </p>
            </button>
          ) : (
            <button
              key={i + 1}
              className="w-4 h-4 bg-slate-200 p-3 flex items-center justify-center text-slate-400 cursor-not-allowed"
            >
              <p className="text-sm  flex items-center justify-center ">
                {i + 1}
              </p>
            </button>
          )
        )}

        <button
          className={`w-4 h-4  p-3 flex items-center justify-center rounded-r-md  ${
            page === totalPage
              ? "text-slate-400 cursor-not-allowed bg-slate-200"
              : "bg-slate-400 text-white hover:bg-slate-500 duration-200 transition-colors ease-in-out"
          }`}
          onClick={() => {
            if (page !== totalPage) onPageChange(page + 1);
          }}
        >
          <p className="text-sm  flex items-center justify-center">
            <span className="ic--sharp-navigate-next"></span>
          </p>
        </button>
      </div>
    );
  }
};

export default Paginate;
