import Link from 'next/link';
import { ProjectList } from '../components/ProjectList';

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold">Bienvenue sur Orlix Admin</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Orchestration de vos projets IA, suivi des agents et gestion des déploiements en un seul endroit.
        </p>
      </section>

      <section className="space-y-2">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Projets actifs</h2>
          <Link className="text-sm text-blue-400 underline" href="#">
            Voir tous les projets
          </Link>
        </header>
        <ProjectList />
      </section>
    </main>
  );
}
