import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { db } from "./config";

const PROJECTS_COLLECTION = "projects";
const LEADS_COLLECTION = "leads";

// ─── Projects ────────────────────────────────────────────────────────────────

export const getProjects = async (limitCount = null) => {
  try {
    let q = query(
      collection(db, PROJECTS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    if (limitCount)
      q = query(
        collection(db, PROJECTS_COLLECTION),
        orderBy("createdAt", "desc"),
        limit(limitCount),
      );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const getProjectById = async (id) => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
    return null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

export const addProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      title: projectData.title,
      description: projectData.description,
      techStack: projectData.techStack || "",
      image: projectData.image || "",
      liveLink: projectData.liveLink || "",
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error("Error adding project:", error);
    return { success: false, error };
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(docRef, { ...projectData, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error };
  }
};

export const deleteProject = async (id) => {
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error };
  }
};

// ─── Leads ───────────────────────────────────────────────────────────────────

export const submitLead = async (leadData) => {
  try {
    await addDoc(collection(db, LEADS_COLLECTION), {
      ...leadData,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false, error };
  }
};

export const getLeads = async () => {
  try {
    const q = query(
      collection(db, LEADS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
};

export const deleteLead = async (id) => {
  try {
    await deleteDoc(doc(db, LEADS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting lead:", error);
    return { success: false, error };
  }
};
