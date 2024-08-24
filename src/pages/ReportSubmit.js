import React, { useState } from 'react';
import { useFormik } from 'formik';
import { LuDownload } from "react-icons/lu";

import { FaRegCopy } from "react-icons/fa6";

const ReportSubmit = () => {
    const formik = useFormik({
        initialValues: {
            file: null,
        },
        onSubmit: (values) => {
            if (values.file) {
                alert(`File submitted: ${values.file.name}`);
                // Here you can handle the form submission, e.g., send the file to a server
            }
        },
        validate: (values) => {
            const errors = {};
            if (!values.file) {
                errors.file = 'File is required';
            }
            return errors;
        },
    });

    const [reportSummary, setReportSummary] = useState("");
    const [reportCol, setReportCol] = useState("black");

    return (
        <div className="flex flex-col p-4 min-h-screen">
            <div className='bg-white p-8 md:w-[70%] w-[95%] space-y-4'>
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-6">Upload Your Report to Receive Health Insights</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="file"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Select File
                            </label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                    formik.setFieldValue('file', event.currentTarget.files[0]);
                                }}
                                className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              "
                            />
                            {formik.errors.file ? (
                                <div className="text-red-500 text-sm mt-2">{formik.errors.file}</div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className=" bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                <div className='bg-white rounded-md w-[90vw] border overflow-y-scroll '>
                    <div className=' bg-white p-2 flex items-center justify-between'>
                        <div><h1 className='text-xl text-blue-500 font-bold'>Your Report will Appear Here</h1></div>
                        <div className='flex space-x-2'>
                            <div className='p-2 cursor-pointer rounded-lg hover:bg-blue-500 hover:text-white text-blue-500 border'><FaRegCopy></FaRegCopy></div>
                            <div className='p-2  cursor-pointer rounded-lg hover:bg-blue-500 hover:text-white text-blue-500 border'><LuDownload/></div>
                        </div>
                    </div>
                    <textarea disabled value={reportSummary} readOnly  style={{ borderColor: reportCol,resize: 'none'}} className='aspect-[3] w-full min-w-lg bg-gray-50'></textarea>
                </div>
            </div>
        </div>
    );
};

export default ReportSubmit;
