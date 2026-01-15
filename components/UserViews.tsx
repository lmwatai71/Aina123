import React, { useState } from 'react';
import { User, Lock, Mail, MapPin, UserCircle, LogIn, Save, Shield, Check, Users, MessageCircle, Heart, Share2, Plus, Filter, Tag } from 'lucide-react';
import { UserProfile, CommunityPost } from '../types';

interface ProfileViewProps {
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogin, onLogout }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const newUser: UserProfile = {
      name: formData.name || 'Hanauna Hou',
      email: formData.email,
      location: formData.location || 'Hawaiʻi Island',
      bio: formData.bio || 'Aloha, I am using AinaMind to better steward my land.',
      joinedDate: Date.now()
    };
    onLogin(newUser);
  };

  if (!user) {
    return (
      <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="bg-emerald-900 p-6 text-white text-center">
            <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-emerald-200" />
            </div>
            <h2 className="text-2xl font-bold">
              {isRegistering ? 'Join AinaMind' : 'Welcome Back'}
            </h2>
            <p className="text-emerald-200 text-sm mt-2">
              Securely access your farm plan and profile.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-stone-400" size={18} />
                  <input
                    type="text"
                    required={isRegistering}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Keola Smith"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-stone-400" size={18} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-stone-400" size={18} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Location (Ahupuaʻa)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-stone-400" size={18} />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Waimea, Hawaiʻi"
                  />
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors shadow-md mt-2">
              {isRegistering ? 'Create Account' : 'Sign In'}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-emerald-700 font-medium hover:underline"
              >
                {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
             <h2 className="text-3xl font-bold text-emerald-900 mb-2 flex items-center gap-3">
              <UserCircle className="text-emerald-600" />
              Kōmole (Your Profile)
            </h2>
            <p className="text-stone-600">Manage your personal information and preferences.</p>
          </div>
          <button 
            onClick={onLogout}
            className="text-stone-500 hover:text-red-600 font-medium text-sm flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="bg-emerald-50 p-6 border-b border-emerald-100 flex items-center gap-4">
            <div className="w-20 h-20 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-800 font-bold text-3xl">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-emerald-900">{user.name}</h3>
              <p className="text-emerald-700 flex items-center gap-1">
                <MapPin size={16} /> {user.location}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-600 bg-white px-3 py-1 rounded-full shadow-sm">
              <Shield size={14} />
              Secure Account
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold text-stone-800">Personal Information</h4>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-emerald-600 font-medium hover:text-emerald-800 flex items-center gap-1"
              >
                {isEditing ? <Check size={18}/> : <Share2 size={18}/>}
                {isEditing ? 'Done' : 'Edit Profile'}
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-500 mb-1">Email</label>
                  <div className="text-stone-900 font-medium p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
                    <Mail size={16} className="text-stone-400"/>
                    {user.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-500 mb-1">Member Since</label>
                  <div className="text-stone-900 font-medium p-3 bg-stone-50 rounded-lg border border-stone-200">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-500 mb-1">Bio / Farming Goals</label>
                {isEditing ? (
                  <textarea 
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    defaultValue={user.bio}
                    rows={4}
                  />
                ) : (
                  <div className="text-stone-700 leading-relaxed p-4 bg-stone-50 rounded-lg border border-stone-100 italic">
                    "{user.bio}"
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-stone-50 px-8 py-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
            <span>Last login: Just now</span>
            <span className="flex items-center gap-1"><Lock size={12}/> Data encrypted and stored locally.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CommunityViewProps {
  posts: CommunityPost[];
  onAddPost: (post: CommunityPost) => void;
  user: UserProfile | null;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ posts, onAddPost, user }) => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Observation');

  const categories = ['All', 'Tip', 'Observation', 'Question', 'Success'];

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      author: user ? user.name : 'Anonymous Farmer',
      location: user ? user.location : 'Hawaiʻi Island',
      category: newPostCategory as any,
      content: newPostContent,
      likes: 0,
      timestamp: Date.now()
    };

    onAddPost(post);
    setNewPostContent('');
    setShowPostForm(false);
  };

  const filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(p => p.category === filter);

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900 mb-2 flex items-center gap-3">
              <Users className="text-emerald-600" />
              Manaʻo (Community Insights)
            </h2>
            <p className="text-stone-600">Share knowledge and observations with neighbors on Hawaiʻi Island.</p>
          </div>
          <button 
            onClick={() => setShowPostForm(true)}
            className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors shadow-md flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Share Manaʻo
          </button>
        </header>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {categories.map(cat => (
             <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border flex items-center gap-2
                  ${filter === cat 
                    ? 'bg-emerald-800 text-white border-emerald-800' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}
                `}
             >
               {cat === 'Tip' && <Tag size={14}/>}
               {cat === 'Question' && <MessageCircle size={14}/>}
               {cat}
             </button>
          ))}
        </div>

        {/* Post Form */}
        {showPostForm && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-emerald-100 animate-in fade-in slide-in-from-top-4">
            <h3 className="font-bold text-lg text-emerald-900 mb-4">Post to Community</h3>
            <form onSubmit={handlePost}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select 
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                >
                  <option value="Tip">Farming Tip</option>
                  <option value="Observation">Observation</option>
                  <option value="Question">Question</option>
                  <option value="Success">Success Story</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700 mb-1">Your Manaʻo</label>
                <textarea 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24 resize-none"
                  placeholder="Share what you're seeing in the field..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500">
                      <User size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-stone-900">{post.author}</h4>
                     <p className="text-xs text-stone-500 flex items-center gap-1">
                       <MapPin size={12} /> {post.location} • {new Date(post.timestamp).toLocaleDateString()}
                     </p>
                   </div>
                 </div>
                 <span className={`
                    text-xs font-bold px-2 py-1 rounded uppercase tracking-wider
                    ${post.category === 'Tip' ? 'bg-blue-100 text-blue-800' : 
                      post.category === 'Question' ? 'bg-amber-100 text-amber-800' : 
                      post.category === 'Success' ? 'bg-green-100 text-green-800' : 
                      'bg-stone-100 text-stone-600'}
                 `}>
                   {post.category}
                 </span>
               </div>
               
               <p className="text-stone-800 leading-relaxed mb-4 text-lg">
                 {post.content}
               </p>

               <div className="flex items-center gap-6 pt-4 border-t border-stone-100 text-stone-500 text-sm">
                 <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                   <Heart size={18} /> {post.likes} Likes
                 </button>
                 <button className="flex items-center gap-2 hover:text-emerald-700 transition-colors">
                   <MessageCircle size={18} /> Reply
                 </button>
                 <button className="flex items-center gap-2 hover:text-blue-600 transition-colors ml-auto">
                   <Share2 size={18} /> Share
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
