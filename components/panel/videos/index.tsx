import React from 'react';

type Props = {};

const VideosManager = (props: Props) => {
  return (
    <>
      <table className="table-auto w-full">
        <thead className="bg-indigo-800 text-left">
          <tr>
            <th className="p-1 font-semibold">Preview</th>
            <th className="p-1 font-semibold">Title</th>
            <th className="p-1 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-slate-800">
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default VideosManager;
