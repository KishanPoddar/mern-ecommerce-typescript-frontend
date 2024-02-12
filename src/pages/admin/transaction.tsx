import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/loader";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";

interface DataType {
    user: string;
    amount: number;
    discount: number;
    quantity: number;
    status: ReactElement;
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    {
        Header: "Name",
        accessor: "user",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];

const Transaction = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);

    const { data, isLoading, isError, error } = useAllOrdersQuery(
        user?._id as string
    );

    if (isError) {
        const err = error as CustomError;
        toast.error(err.data.message);
    }

    const [rows, setRows] = useState<DataType[]>([]);

    const Table = TableHOC<DataType>(
        columns,
        rows,
        "dashboard-product-box",
        "Transactions",
        rows.length > 6
    )();

    useEffect(() => {
        if (data) {
            setRows(
                data.orders.map((i) => ({
                    user: i.user?.name,
                    amount: i.total,
                    discount: i.discount,
                    status: (
                        <span
                            className={
                                i.status === "Processing"
                                    ? "red"
                                    : i.status === "Shipped"
                                    ? "green"
                                    : "purple"
                            }>
                            {i.status}
                        </span>
                    ),
                    quantity: i.orderItems.length,
                    action: (
                        <Link to={`/admin/transaction/${i._id}`}>Manage</Link>
                    ),
                }))
            );
        }
    }, [data]);
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>{isLoading ? <Skeleton length={15} /> : Table}</main>
        </div>
    );
};

export default Transaction;
