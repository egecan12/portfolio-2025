import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-text-muted mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex space-x-4">
              <a
                href="#projects"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                {t('hero.cta')}
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Egecan Kahyaoglu"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8">{t('about.title')}</h2>
          <div className="prose prose-invert">
            <p className="text-lg mb-6">{t('about.description')}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'Python'].map((skill) => (
                <div
                  key={skill}
                  className="bg-background-light p-4 rounded-lg text-center hover:bg-background-light/80 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 