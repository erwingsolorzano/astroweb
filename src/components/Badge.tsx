interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md' 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-white/5 text-slate-200 border border-white/10',
    primary: 'bg-green-400/10 text-green-200 border border-green-400/20',
    secondary: 'bg-slate-700/40 text-slate-200 border border-white/10',
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}
