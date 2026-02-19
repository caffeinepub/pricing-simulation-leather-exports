import PricingSimulator from './components/PricingSimulator';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Leather Export Pricing Simulator</h1>
          <p className="text-muted-foreground mt-2">Optimize your pricing strategy across 5 export markets</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <PricingSimulator />
      </main>
      
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Leather Export Pricing Simulator. Built with love using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
