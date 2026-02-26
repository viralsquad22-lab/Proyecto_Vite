import React, { useState } from 'react';
import { ShoppingBasket, User, Lock, Eye, EyeOff, Facebook } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <header className="flex items-center justify-between px-6 py-4 lg:px-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white">
            <ShoppingBasket size={24} />
          </div>
          <h2 className="text-slate-900 text-xl font-bold tracking-tight">Mercapleno</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600 hidden sm:block">¿No tienes cuenta?</span>
          <button className="text-sm font-bold text-primary hover:underline">Regístrate</button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-[480px] bg-white rounded-xl shadow-2xl shadow-primary/5 border border-slate-100 p-8 md:p-12"
        >
          <div className="flex flex-col items-center text-center mb-10">
            <div className="mb-6">
              <img 
                className="h-16 w-auto" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyKcpgZPE4ir-oXSEGXCsVg9Hj64lKtn9eJPmgzTZ7kLpQS_ZsNK8FllPyD1H1GCb8oOkLOia8Tc4AGJ74UA5seWgZjj5ppRo8oaMc5PRRzLHTCIErl7QvS6GS55lCTOhdjZwSygo_kY3BhPVeMKlHfW0z26vz45oKIyZzrszf-1SXKNrE-fBa_9J2Z4joMcVZUZg_goRE6iL9cbrJEkIlvqQX1SP9EVNPqXNBo86kj8epKwuaOH66kLP_tBlLXmqUu5PirGzg_eo" 
                alt="Mercapleno logo"
              />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Bienvenido</h1>
            <p className="text-slate-500 text-base">Ingresa a tu cuenta de Mercapleno para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email o Usuario</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </span>
                <input 
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900" 
                  placeholder="ejemplo@correo.com" 
                  type="text" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-slate-700">Contraseña</label>
                <button type="button" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">¿Olvidaste tu contraseña?</button>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </span>
                <input 
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900" 
                  placeholder="********" 
                  type={showPassword ? "text" : "password"} 
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" 
                  type="button"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary focus:ring-2" id="remember" type="checkbox" />
              <label className="text-sm text-slate-600 select-none cursor-pointer" htmlFor="remember">Recordarme en este equipo</label>
            </div>

            <button 
              className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] mt-2" 
              type="submit"
            >
              Ingresar
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400">O ingresa con</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700">
              <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700">
              <Facebook className="w-5 h-5 text-[#1877F2]" fill="currentColor" />
              <span>Facebook</span>
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Al ingresar, aceptas nuestros <button className="underline hover:text-primary">Términos de Servicio</button> y <button className="underline hover:text-primary">Política de Privacidad</button>.
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="hidden xl:block absolute -left-20 bottom-20 opacity-20 transform -rotate-12">
          <img className="w-64 h-64 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Mep4bqsb8-WiY3JL1bZpaIT4cePH_9LrejmV9vzCnw5ftZ6Q6YkzB3w4_TCTB_viSz025TaTWAoKvH_qqa9Ie8VbSpJdg_0XVMF_gatfLtOhyQqXCLhHe7awkLbA2A20U3vkKBOReddJobrrdqa_fRIZfXilYluJO7SRUgGTvEQFbRhXe0Zxqrb27Zp3YyUYAB0XsTLDcJrQ3XSq0_ZmS70KjI-XGzcx1x85VAyH0zPEDyw1Xa4J5pq6Os2uSXgqjzSLnyGppf4" alt="Fresh vegetables" />
        </div>
        <div className="hidden xl:block absolute -right-20 top-20 opacity-20 transform rotate-12">
          <img className="w-64 h-64 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7ey9kSqKQzjyWu_AnRvIhZhNBeBuv-s-cM4DYZfxkVF-XcZE6p-TlX3neJfijSJ0jZy7pef8Tg7GQS6M_s7CEJVvddFo6yRxTWNE1JX0oGxDHr_RTKIse0tcBlUwepdufj343B1rbtvDxuuoJPTBDOUqSE5he_PiSWkSfPBelypH9zsZ7LfmCt79JKf8LAiBrd4hW9oRl3Po1NViJrQatIMUuy3k3-wyWQd7XotSaxjBllxhRMAk-Yks7Szhbb4AAxchto4PL15A" alt="Grocery bag" />
        </div>
      </main>

      <footer className="py-6 px-10 text-center border-t border-slate-200 bg-white">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
          © 2024 Mercapleno Supermercados - Frescura en cada hogar
        </p>
      </footer>
    </div>
  );
}