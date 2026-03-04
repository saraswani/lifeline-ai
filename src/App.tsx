import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, 
  Droplets, 
  Flame, 
  Wind, 
  Activity, 
  Bone, 
  Skull, 
  AlertCircle, 
  Navigation, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  Timer,
  MapPin,
  Moon,
  Sun,
  X,
  Send,
  PhoneCall,
  Copy,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { EMERGENCY_CATEGORIES } from './constants';
import { EmergencyCategory, Step, Question } from './types';

// --- Components ---

/**
 * Navbar component for navigation and theme toggling
 */
const Navbar = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (v: boolean) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center">
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-medical-red p-2 rounded-lg">
        <Activity className="text-white w-6 h-6" />
      </div>
      <span className="text-xl font-bold tracking-tight text-medical-red">LifeLine AI</span>
    </Link>
    <div className="flex items-center gap-4">
      <Link to="/map" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
        <MapPin className="w-5 h-5" />
      </Link>
    </div>
  </nav>
);

/**
 * SOS and Emergency Call Buttons
 * Provides one-tap access to emergency services and records emergency data
 */
const SOSButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSOS = async () => {
    setIsRecording(true);
    try {
      // Get location
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        await fetch('/api/sos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emergencyType: 'SOS Button Triggered',
            location: `Lat: ${latitude}, Lng: ${longitude}`,
            timestamp: new Date().toISOString()
          })
        });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl font-medium"
            >
              Emergency Recorded!
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* India Emergency Call Buttons */}
        <div className="flex flex-col gap-2">
          <a 
            href="tel:112" 
            className="bg-medical-red text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-black border-2 border-white"
          >
            <PhoneCall size={20} /> CALL 112
          </a>
          <a 
            href="tel:108" 
            className="bg-medical-red text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-black border-2 border-white"
          >
            <PhoneCall size={20} /> CALL 108
          </a>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSOS}
          className="w-16 h-16 bg-medical-red rounded-full shadow-2xl shadow-red-500/50 flex items-center justify-center text-white font-black text-xl border-4 border-white dark:border-slate-900"
        >
          {isRecording ? <Activity className="animate-pulse" /> : "SOS"}
        </motion.button>
      </div>
    </>
  );
};

// --- Pages ---

const Home = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationData, setLocationData] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const handleShareLocation = () => {
    setIsLoading(true);
    setLocationSuccess(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const data = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocationData(data);
        setLocationSuccess(true);
        setTimeout(() => {
          setShowLocationModal(true);
          setIsLoading(false);
          setLocationSuccess(false);
        }, 1500);
      },
      (err) => {
        alert("Unable to retrieve your location. Please enable location services.");
        setIsLoading(false);
      }
    );
  };

  const handleFindHospitals = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        window.open(`https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`, '_blank');
      },
      () => {
        window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
      }
    );
  };

  const googleMapsUrl = locationData ? `https://maps.google.com/?q=${locationData.lat},${locationData.lng}` : '';
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Emergency! My current location: ${googleMapsUrl}`)}`;

  const copyToClipboard = () => {
    if (googleMapsUrl) {
      navigator.clipboard.writeText(googleMapsUrl);
      alert("Location link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
          Real-Time <span className="text-medical-red">First Aid</span> Guidance
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
          When every second matters, LifeLine AI provides instant, step-by-step instructions to save lives.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/categories" className="btn-primary text-2xl py-6 px-12 flex-1 shadow-red-500/40">
            <AlertCircle className="w-8 h-8" />
            START EMERGENCY HELP
          </Link>
        </div>

        {/* Refined Secondary Buttons */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[85%]">
            <div className="flex-1 flex flex-col gap-2">
              <button 
                onClick={handleShareLocation}
                disabled={isLoading}
                className={`btn-primary py-4 px-6 w-full bg-medical-red/90 hover:bg-medical-red shadow-red-500/10 text-lg transition-all hover:-translate-y-0.5 hover:shadow-red-500/20 ${isLoading ? 'opacity-90' : ''}`}
              >
                {isLoading ? (
                  <>
                    {locationSuccess ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                    <span className="animate-pulse">
                      {locationSuccess ? "Location detected successfully" : "Detecting your location..."}
                    </span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-5 h-5" />
                    SHARE LOCATION
                  </>
                )}
              </button>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold opacity-60">
                Send your exact location instantly
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <button 
                onClick={handleFindHospitals}
                className="btn-primary py-4 px-6 w-full bg-green-600 hover:bg-green-700 shadow-green-500/10 text-lg border-none transition-all hover:-translate-y-0.5 hover:shadow-green-500/20"
              >
                <Navigation className="w-5 h-5" />
                FIND HOSPITALS
              </button>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold opacity-60">
                Locate nearest medical facilities
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 glass rounded-2xl">
            <Activity className="text-medical-red mb-4" />
            <h3 className="font-bold mb-2">Instant Steps</h3>
            <p className="text-sm text-slate-500">Clear, numbered instructions for critical situations.</p>
          </div>
          <div className="p-6 glass rounded-2xl">
            <Volume2 className="text-medical-blue mb-4" />
            <h3 className="font-bold mb-2">Voice Guidance</h3>
            <p className="text-sm text-slate-500">Audio instructions so you can keep your hands free.</p>
          </div>
          <div className="p-6 glass rounded-2xl">
            <MapPin className="text-green-500 mb-4" />
            <h3 className="font-bold mb-2">Nearby Help</h3>
            <p className="text-sm text-slate-500">Locate the closest hospitals and trauma centers.</p>
          </div>
        </div>
      </motion.div>

      {/* Location Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="glass max-w-md w-full p-8 rounded-[2.5rem] relative border-white/10"
            >
              <button 
                onClick={() => setShowLocationModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col items-center text-center gap-6">
                <div className="bg-medical-red/10 p-5 rounded-full text-medical-red">
                  <MapPin size={48} />
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-2">Location Detected</h2>
                  <p className="text-slate-500 text-sm mb-4">Your coordinates have been captured. Share them with emergency responders.</p>
                  
                  {locationData && (
                    <div className="bg-slate-100 dark:bg-slate-800/50 py-3 px-4 rounded-2xl font-mono text-xs flex justify-center gap-4 text-slate-500">
                      <span>LAT: {locationData.lat.toFixed(6)}</span>
                      <span>LNG: {locationData.lng.toFixed(6)}</span>
                    </div>
                  )}
                </div>
                
                <div className="w-full space-y-3">
                  <button 
                    onClick={copyToClipboard}
                    className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Copy size={18} /> Copy Location Link
                  </button>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-2xl bg-medical-blue text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors"
                  >
                    <Navigation size={18} /> Open in Google Maps
                  </a>
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:bg-green-700 transition-colors"
                  >
                    <Send size={18} /> Share via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Categories = () => {
  const icons: Record<string, any> = { HeartPulse, Droplets, Flame, Wind, Activity, Bone, Skull };
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <AlertCircle className="text-medical-red" />
        Select Emergency Type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EMERGENCY_CATEGORIES.map((cat) => {
          const Icon = icons[cat.icon];
          return (
            <Link 
              key={cat.id} 
              to={`/guide/${cat.id}`}
              className="glass p-8 rounded-3xl card-hover flex flex-col items-start gap-4"
            >
              <div className="bg-medical-red/10 p-4 rounded-2xl text-medical-red">
                <Icon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{cat.description}</p>
              </div>
              <ChevronRight className="mt-auto self-end text-slate-300" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Step-by-Step Emergency Guide Page
 * Handles the logic for displaying instructions, voice guidance, and timers
 */
const Guide = () => {
  const { id } = useLocation().pathname.split('/').pop() ? { id: useLocation().pathname.split('/').pop() } : { id: '' };
  const category = EMERGENCY_CATEGORIES.find(c => c.id === id);
  const [currentNodeId, setCurrentNodeId] = useState(category?.initialNodeId || '');
  const [history, setHistory] = useState<string[]>([]);
  const navigate = useNavigate();

  if (!category) return <div className="pt-24 text-center">Category not found</div>;

  const node = category.nodes[currentNodeId];
  if (!node) return <div className="pt-24 text-center">Step not found</div>;

  const isQuestion = 'text' in node;
  const step = node as Step;
  const question = node as Question;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = (nextId?: string) => {
    const targetId = nextId || (step as Step).nextId;
    
    if (targetId) {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentNodeId(targetId);
    } else {
      // If no nextId, we've reached the end of the guide
      navigate('/map');
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevId = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentNodeId(prevId);
    } else {
      navigate('/categories');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <button onClick={handleBack} className="flex items-center gap-1 text-slate-500 hover:text-medical-red">
          <ChevronLeft size={20} /> {history.length > 0 ? 'Previous Step' : 'Back to Categories'}
        </button>
        <div className="text-sm font-bold text-medical-red uppercase tracking-widest">
          {category.name}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-8 md:p-12 rounded-3xl shadow-2xl"
            >
              {isQuestion ? (
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="bg-medical-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">
                      ?
                    </div>
                    <button 
                      onClick={() => speak(question.text)}
                      className="p-3 bg-medical-blue/10 text-medical-blue rounded-xl hover:bg-medical-blue hover:text-white transition-colors"
                    >
                      <Volume2 />
                    </button>
                  </div>
                  <h2 className="text-3xl font-black leading-tight">{question.text}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {question.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleNext(opt.nextId)}
                        className="py-6 rounded-2xl bg-medical-blue text-white font-black text-xl shadow-lg hover:bg-blue-600 transition-all active:scale-95"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="bg-medical-red text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">
                      {step.id}
                    </span>
                    <button 
                      onClick={() => speak(`${step.title}. ${step.instruction}. ${step.details || ''}`)}
                      className="p-3 bg-medical-blue/10 text-medical-blue rounded-xl hover:bg-medical-blue hover:text-white transition-colors"
                    >
                      <Volume2 />
                    </button>
                  </div>

                  <h2 className="text-3xl font-black leading-tight">{step.title}</h2>
                  <p className="text-xl font-medium text-slate-800 dark:text-slate-100">
                    {step.instruction}
                  </p>
                  {step.details && (
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.details}
                    </p>
                  )}
                  {step.bullets && (
                    <ul className="space-y-3 mt-4">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                          <span className="text-medical-red mt-1.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-8">
                    <button 
                      onClick={() => handleNext()}
                      className="w-full py-4 rounded-2xl bg-medical-red text-white font-bold shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                    >
                      Next Step <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          {category.symptoms && (
            <div className="glass p-6 rounded-2xl border-t-4 border-medical-blue">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <AlertCircle className="text-medical-blue" size={20} /> Symptoms
              </h3>
              <ul className="space-y-2">
                {category.symptoms.map((s, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-medical-blue mt-1">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="glass p-6 rounded-2xl border-t-4 border-red-500">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-600">
              <X className="text-red-600" size={20} /> What NOT to Do
            </h3>
            <ul className="space-y-2">
              {category.whatNotToDo.map((item, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-red-500 mt-1">❌</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl border-t-4 border-green-500">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-600">
              <PhoneCall className="text-green-600" size={20} /> While Waiting
            </h3>
            <ul className="space-y-2">
              {category.whileWaiting.map((item, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Hospital Locator Page
 * Real Google Maps embedded with nearby hospitals
 */
const MapPage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  const openFullMaps = () => {
    if (location) {
      window.open(
        `https://www.google.com/maps/search/hospitals/@${location.lat},${location.lng},14z`,
        "_blank"
      );
    } else {
      window.open(
        "https://www.google.com/maps/search/hospitals+near+me",
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <MapPin className="text-medical-red" />
        Nearby Hospitals
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REAL GOOGLE MAP */}
        <div className="lg:col-span-2 glass rounded-3xl overflow-hidden h-[500px] relative">
          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              Detecting your location...
            </div>
          ) : location ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=hospitals&ll=${location.lat},${location.lng}&z=14&output=embed`}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              Unable to detect location.
            </div>
          )}
        </div>

        {/* RIGHT SIDE ACTION PANEL */}
        <div className="space-y-6">
          
          {location && (
            <div className="glass p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Your Location</h3>
              <p className="text-xs font-mono text-slate-500">
                LAT: {location.lat.toFixed(6)}
              </p>
              <p className="text-xs font-mono text-slate-500">
                LNG: {location.lng.toFixed(6)}
              </p>
            </div>
          )}

          <button
            onClick={openFullMaps}
            className="w-full py-4 rounded-2xl bg-medical-blue text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <Navigation size={18} />
            Open in Full Google Maps
          </button>

          <a
            href="tel:108"
            className="w-full py-4 rounded-2xl bg-medical-red text-white font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <PhoneCall size={18} />
            CALL AMBULANCE
          </a>
        </div>
      </div>
    </div>
  );
};
// --- Main App ---

export default function App() {
  const [darkMode] = useState(true);

  useEffect(() => {
  document.documentElement.classList.add('dark');
}, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/guide/:id" element={<Guide />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </main>

        <SOSButton />
      </div>
    </Router>
  );
}
