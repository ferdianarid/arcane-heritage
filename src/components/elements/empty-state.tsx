interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
      {description && (
        <p className="text-white/70 text-base md:text-lg">{description}</p>
      )}
    </div>
  );
}
