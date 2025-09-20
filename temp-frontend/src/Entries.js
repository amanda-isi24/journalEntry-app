import React, { useEffect, useState } from "react";
import axios from "axios";

const Entries = () => {
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({
        content: "",
        created_at: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editDate, setEditDate] = useState("");


    // GET: Fetch all journey plans
    const fetchPlans = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/entries");
            setPlans(res.data);
        } catch (err) {
            console.error("Error fetching journal entry:", err);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    // POST: Create a new journey plan
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/entries", {
                content: newPlan.content,
                created_at: newPlan.created_at,
            });
            setNewPlan({
                content: "",
                created_at: ""
            });
            fetchPlans();
        } catch (err) {
            console.error("Error creating journal_entry:", err);
        }
    };
    const handleEdit = (plan) => {
        setEditingId(plan.id);
        setEditContent(plan.content);
        setEditDate(plan.created_at.split("T")[0]); // format date nicely
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/entries/${editingId}`, {
                content: editContent,
                created_at: editDate,
            });
            setEditingId(null); // exit edit mode
            setEditContent("");
            setEditDate("");
            fetchPlans();
        } catch (err) {
            console.error("Error updating entry:", err);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/entries/${id}`);
            fetchPlans(); // refresh after delete
        } catch (err) {
            console.error("Error deleting entry:", err);
        }
    };

    return (
        <div className="journal_entry">
            <h2 className="entry-title">My Entries</h2>

            <form className="textbox" onSubmit={handleCreate}>
                <textarea
                    value={newPlan.content}
                    onChange={(e) => setNewPlan({ ...newPlan, content: e.target.value })}
                    placeholder="Write your thoughts here..."
                    rows={10}
                    style={{ width: "100%" }}
                ></textarea>

                <input
                    type="date"
                    value={newPlan.created_at}
                    onChange={(e) => setNewPlan({ ...newPlan, created_at: e.target.value })}
                    required
                />

                <button type="submit">Add</button>
            </form>

            <div className="entries-dashboard">
                <ul>
                    {plans.map((plan) => (
                        <li key={plan.id}>
                            {editingId === plan.id ? (
                                <form onSubmit={handleUpdate}>
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        rows={5}
                                        style={{ width: "100%" }}
                                    />
                                    <input
                                        type="date"
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                        required
                                    />
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditingId(null)}>
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <p>{plan.created_at}</p>
                                    <p>{plan.content}</p>
                                    <button onClick={() => handleEdit(plan)}>Edit</button>
                                    <button onClick={() => handleDelete(plan.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};
export default Entries;