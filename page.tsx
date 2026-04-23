"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { FiPlus, FiChevronDown, FiChevronUp, FiTrash2, FiSave } from "react-icons/fi";

interface WebsiteWorkflow {
  id: string;
  url: string;
  title: string;
  outline: string;
  createdAt: any;
}

export default function WorkflowsPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  
  const [workflows, setWorkflows] = useState<WebsiteWorkflow[]>([]);
  const [fetching, setFetching] = useState(true);
  
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingOutline, setEditingOutline] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser, router]);

  useEffect(() => {
    if (currentUser) {
      fetchWorkflows();
    }
  }, [currentUser]);

  const fetchWorkflows = async () => {
    if (!currentUser) return;
    setFetching(true);
    try {
      const q = query(
        collection(db, `users/${currentUser.uid}/workflows`),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const items: WebsiteWorkflow[] = [];
      querySnapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as WebsiteWorkflow);
      });
      setWorkflows(items);
    } catch (error) {
      console.error("Error fetching workflows:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newUrl || !newTitle) return;
    
    setIsAdding(true);
    try {
      const docRef = await addDoc(collection(db, `users/${currentUser.uid}/workflows`), {
        url: newUrl,
        title: newTitle,
        outline: "",
        createdAt: serverTimestamp(),
      });
      
      const newWorkflow: WebsiteWorkflow = {
        id: docRef.id,
        url: newUrl,
        title: newTitle,
        outline: "",
        createdAt: new Date(),
      };
      
      setWorkflows([newWorkflow, ...workflows]);
      setNewUrl("");
      setNewTitle("");
    } catch (error) {
      console.error("Error adding website:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const toggleExpand = (id: string, currentOutline: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!(id in editingOutline)) {
        setEditingOutline((prev) => ({ ...prev, [id]: currentOutline }));
      }
    }
  };

  const handleSaveOutline = async (id: string) => {
    if (!currentUser) return;
    const newOutline = editingOutline[id];
    
    try {
      const docRef = doc(db, `users/${currentUser.uid}/workflows`, id);
      await updateDoc(docRef, {
        outline: newOutline
      });
      
      setWorkflows((prev) => 
        prev.map(w => w.id === id ? { ...w, outline: newOutline } : w)
      );
    } catch (error) {
      console.error("Error updating outline:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!currentUser) return;
    if (!confirm("Are you sure you want to delete this website workflow?")) return;
    
    try {
      const docRef = doc(db, `users/${currentUser.uid}/workflows`, id);
      await deleteDoc(docRef);
      setWorkflows((prev) => prev.filter(w => w.id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (error) {
      console.error("Error deleting workflow:", error);
    }
  };

  if (loading || (!currentUser && !loading)) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.loading}>Loading...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <header className={styles.header}>
            <h1 className={styles.title}>Your Workflows</h1>
            <p className={styles.subtitle}>Save specific websites and expand them into detailed outlines.</p>
          </header>

          <section className={styles.addSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Add New Website</h2>
              <form onSubmit={handleAddWebsite} className={styles.addForm}>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Website Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Stripe Landing Page" 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>URL</label>
                    <input 
                      type="url" 
                      placeholder="https://..." 
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className={`btn-primary ${styles.addBtn}`} disabled={isAdding}>
                  {isAdding ? "Adding..." : <><FiPlus /> Add Website</>}
                </button>
              </form>
            </div>
          </section>

          <section className={styles.workflowsList}>
            {fetching ? (
              <div className={styles.loading}>Fetching your saved websites...</div>
            ) : workflows.length === 0 ? (
              <div className={styles.emptyState}>
                <p>You haven't saved any websites yet. Add one above to get started!</p>
              </div>
            ) : (
              workflows.map((wf) => (
                <div key={wf.id} className={`${styles.workflowCard} ${expandedId === wf.id ? styles.expanded : ''}`}>
                  <div 
                    className={styles.workflowHeader} 
                    onClick={() => toggleExpand(wf.id, wf.outline)}
                  >
                    <div className={styles.workflowInfo}>
                      <h3>{wf.title}</h3>
                      <a href={wf.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        {wf.url}
                      </a>
                    </div>
                    <div className={styles.workflowActions}>
                      <button 
                        className={styles.iconBtn} 
                        onClick={(e) => { e.stopPropagation(); handleDelete(wf.id); }}
                        title="Delete Website"
                      >
                        <FiTrash2 />
                      </button>
                      <button className={styles.expandBtn}>
                        {expandedId === wf.id ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                    </div>
                  </div>
                  
                  {expandedId === wf.id && (
                    <div className={styles.workflowBody}>
                      <div className={styles.outlineEditor}>
                        <label>Workflow Outline / Notes</label>
                        <textarea
                          placeholder="Write your detailed outline, feature breakdown, or notes for this website..."
                          value={editingOutline[wf.id] ?? wf.outline}
                          onChange={(e) => setEditingOutline(prev => ({ ...prev, [wf.id]: e.target.value }))}
                          rows={8}
                        />
                        <div className={styles.editorActions}>
                          <button 
                            className={`btn-primary ${styles.saveBtn}`}
                            onClick={() => handleSaveOutline(wf.id)}
                            disabled={editingOutline[wf.id] === wf.outline}
                          >
                            <FiSave /> {editingOutline[wf.id] === wf.outline ? "Saved" : "Save Outline"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </section>
        </div>
      </main>
    </>
  );
}
