import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase/config';
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile as updateDbProfile,
} from '../firebase/firestoreService';
import { UserProfile, UserPreferences } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserPreferences: (prefs: UserPreferences) => Promise<void>;
  updateDisplayName: (name: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isConfigured = isFirebaseConfigured();

  useEffect(() => {
    if (!auth) {
      // If Firebase Auth is not configured, we start logged out
      setUser(null);
      setUserProfile(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          let profile = await getUserProfile(currentUser.uid);
          if (!profile) {
            profile = await createUserProfile(currentUser.uid, {
              email: currentUser.email,
              displayName: currentUser.displayName || 'Creator',
              photoURL: currentUser.photoURL,
            });
          }
          setUserProfile(profile);
        } catch (err) {
          console.error('Failed to load user profile doc:', err);
          // Fallback minimal profile from Auth token
          setUserProfile({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || 'Creator',
            photoURL: currentUser.photoURL,
          });
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Firebase credentials are not configured. Please add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID to your environment.');
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    let profile = await getUserProfile(cred.user.uid);
    if (!profile) {
      profile = await createUserProfile(cred.user.uid, {
        email: cred.user.email,
        displayName: cred.user.displayName || email.split('@')[0],
      });
    }
    setUserProfile(profile);
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!auth) {
      throw new Error('Firebase credentials are not configured. Please add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID to your environment.');
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (fullName) {
      await updateFirebaseProfile(cred.user, { displayName: fullName });
    }
    const profile = await createUserProfile(cred.user.uid, {
      email,
      displayName: fullName,
    });
    setUserProfile(profile);
  };

  const signInWithGoogle = async () => {
    if (!auth) {
      throw new Error('Firebase credentials are not configured. Please configure Firebase to enable Google Sign-In.');
    }
    const cred = await signInWithPopup(auth, googleProvider);
    let profile = await getUserProfile(cred.user.uid);
    if (!profile) {
      profile = await createUserProfile(cred.user.uid, {
        email: cred.user.email,
        displayName: cred.user.displayName || 'Creator',
        photoURL: cred.user.photoURL,
      });
    }
    setUserProfile(profile);
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    setUserProfile(null);
  };

  const resetPassword = async (email: string) => {
    if (!auth) {
      throw new Error('Firebase credentials are not configured.');
    }
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserPreferences = async (prefs: UserPreferences) => {
    if (!user) return;
    if (userProfile) {
      const updatedProfile: UserProfile = {
        ...userProfile,
        preferences: { ...(userProfile.preferences || {}), ...prefs },
      };
      setUserProfile(updatedProfile);
      await updateDbProfile(user.uid, { preferences: updatedProfile.preferences });
    }
  };

  const updateDisplayName = async (name: string) => {
    if (!user) return;
    if (auth && auth.currentUser) {
      await updateFirebaseProfile(auth.currentUser, { displayName: name });
    }
    if (userProfile) {
      const updatedProfile: UserProfile = { ...userProfile, displayName: name };
      setUserProfile(updatedProfile);
      await updateDbProfile(user.uid, { displayName: name });
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    try {
      const p = await getUserProfile(user.uid);
      if (p) setUserProfile(p);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isConfigured,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
        resetPassword,
        updateUserPreferences,
        updateDisplayName,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
