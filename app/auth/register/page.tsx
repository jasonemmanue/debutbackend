// /app/auth/register/page.tsx
"use client";

import { Button } from "@/components/ui/button";
// [CORRIGÉ] Ajout de CardDescription à l'import
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // [CORRIGÉ] Casse en minuscules
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, AlertCircle, Loader2, CheckCircle, Home, Building2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// [CORRECTION BUG SAISIE] Le composant est défini en dehors pour ne pas être recréé à chaque render.
const InputField = ({ 
  icon: Icon, 
  type = 'text', 
  name, 
  placeholder, 
  value,
  onChange,
  error,
  showToggle = false, 
  showPassword, 
  onToggle
}: any) => (
  <div className="space-y-1">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={showToggle ? (showPassword ? 'text' : 'password') : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-${showToggle ? '12' : '4'} py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
        }`}
      />
      {showToggle && (
        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={onToggle}>
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center text-sm text-red-600 mt-1">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </div>
    )}
  </div>
);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { setBackgroundLoaded(true); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Le nom est requis';
    if (!formData.email) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe doivent correspondre';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleManualRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Une erreur est survenue.");
      }
      setIsSuccess(true);
      setTimeout(() => router.push("/auth/login?registration=success"), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleRegister = () => {
    setIsLoading(true);
    setLoadingProvider("google");
    signIn("google", { callbackUrl: "/auth/complete-profile" });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm"><CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"><CheckCircle className="h-8 w-8 text-green-600" /></div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Inscription réussie !</h3>
          <p className="text-gray-600 mb-6">Votre compte a été créé. Vous allez être redirigé vers la page de connexion.</p>
          <Loader2 className="h-6 w-6 mx-auto animate-spin text-rose-500" />
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-rose-600/70 to-purple-600/60 z-10 transition-opacity duration-1000 ${backgroundLoaded ? 'opacity-100' : 'opacity-0'}`} />
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop" alt="Arrière-plan" className={`w-full h-full object-cover transition-all duration-1000 transform ${backgroundLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} onLoad={() => setBackgroundLoaded(true)} />
        <div className={`absolute inset-0 z-20 flex items-center justify-center p-12 transition-all duration-1000 delay-500 ${backgroundLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"><Building2 className="text-white w-8 h-8" /></div>
            <h2 className="text-3xl font-bold mb-4">Rejoignez notre communauté</h2>
            <p className="text-white/90 text-lg max-w-md">Créez votre compte et commencez à explorer l'écosystème entrepreneurial dès aujourd'hui.</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md relative z-10">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Créer un Compte</CardTitle>
              <CardDescription className="text-gray-600">Rapide, simple et sécurisé.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button onClick={handleGoogleRegister} disabled={isLoading} className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-md transition-all duration-300">
                {loadingProvider === "google" ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <> <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>S'inscrire avec Google</>}
              </Button>
              <div className="relative"><Separator className="my-6" /><div className="absolute inset-0 flex items-center justify-center"><span className="bg-white px-4 text-sm text-gray-500">ou</span></div></div>
              <form onSubmit={handleManualRegister} className="space-y-4">
                <InputField icon={User} name="name" placeholder="Nom complet" value={formData.name} onChange={handleInputChange} error={errors.name} />
                <InputField icon={Mail} name="email" placeholder="Adresse email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                <InputField icon={Lock} name="password" placeholder="Mot de passe" showToggle={true} showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} value={formData.password} onChange={handleInputChange} error={errors.password} />
                <InputField icon={Lock} name="confirmPassword" placeholder="Confirmer le mot de passe" showToggle={true} showPassword={showConfirmPassword} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
                {error && (<div className="bg-red-100 border border-red-300 rounded-xl p-3 text-center"><p className="text-red-700 text-sm">{error}</p></div>)}
                <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold shadow-lg transition-all duration-300">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Créer le compte"}
                </Button>
              </form>
              <div className="text-center pt-4">
                <p className="text-gray-600">Déjà un compte ? <Link href="/auth/login" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">Se connecter</Link></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}