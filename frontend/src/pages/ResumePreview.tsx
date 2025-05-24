import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  Edit, 
  Printer, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  FileText
} from 'lucide-react';

type TemplateType = 'modern' | 'classic' | 'creative' | 'minimal';

interface Template {
  id: TemplateType;
  name: string;
  description: string;
  thumbnail: string;
}

const ResumePreview: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [activeSection, setActiveSection] = useState<string>('templates');

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean, professional design with a touch of color',
      thumbnail: 'https://images.pexels.com/photos/7821675/pexels-photo-7821675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional layout ideal for corporate positions',
      thumbnail: 'https://images.pexels.com/photos/7821676/pexels-photo-7821676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Unique design for creative industries',
      thumbnail: 'https://images.pexels.com/photos/7821723/pexels-photo-7821723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and clean with focus on content',
      thumbnail: 'https://images.pexels.com/photos/7821678/pexels-photo-7821678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resume Preview</h1>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Edit className="mr-1.5 h-4 w-4" />
            Edit
          </button>
          <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
            <Download className="mr-1.5 h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Templates and options sidebar */}
        <div className="space-y-6 lg:col-span-1">
          {/* Template selection */}
          <div className="rounded-lg bg-white shadow">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  className={`shrink-0 border-b-2 px-6 py-3 text-center text-sm font-medium ${
                    activeSection === 'templates'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveSection('templates')}
                >
                  Templates
                </button>
                <button
                  className={`shrink-0 border-b-2 px-6 py-3 text-center text-sm font-medium ${
                    activeSection === 'sections'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveSection('sections')}
                >
                  Sections
                </button>
                <button
                  className={`shrink-0 border-b-2 px-6 py-3 text-center text-sm font-medium ${
                    activeSection === 'styles'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveSection('styles')}
                >
                  Styling
                </button>
              </nav>
            </div>

            <div className="p-4">
              {activeSection === 'templates' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Choose a template for your resume. Each template is designed for maximum impact and readability.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`cursor-pointer overflow-hidden rounded-md border-2 transition ${
                          selectedTemplate === template.id
                            ? 'border-indigo-500'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="relative h-32 bg-gray-100">
                          <img
                            src={template.thumbnail}
                            alt={template.name}
                            className="h-full w-full object-cover"
                          />
                          {selectedTemplate === template.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-indigo-500/20">
                              <CheckCircle className="h-8 w-8 text-indigo-600" />
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <h4 className="text-xs font-medium text-gray-900">{template.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'sections' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Customize which sections appear in your resume and in what order.
                  </p>
                  <ul className="space-y-2">
                    <SectionItem title="Professional Summary" enabled={true} />
                    <SectionItem title="Work Experience" enabled={true} />
                    <SectionItem title="Education" enabled={true} />
                    <SectionItem title="Skills" enabled={true} />
                    <SectionItem title="Projects" enabled={true} />
                    <SectionItem title="Certifications" enabled={true} />
                    <SectionItem title="Languages" enabled={false} />
                    <SectionItem title="Volunteer Experience" enabled={false} />
                  </ul>
                </div>
              )}

              {activeSection === 'styles' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Customize the styling of your resume to match your personal brand.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Primary Color
                      </label>
                      <div className="mt-1 flex space-x-2">
                        <ColorOption color="bg-blue-500" active={true} />
                        <ColorOption color="bg-indigo-500" active={false} />
                        <ColorOption color="bg-purple-500" active={false} />
                        <ColorOption color="bg-pink-500" active={false} />
                        <ColorOption color="bg-red-500" active={false} />
                        <ColorOption color="bg-green-500" active={false} />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Font Style
                      </label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
                        <option>Modern Sans</option>
                        <option>Classic Serif</option>
                        <option>Minimalist</option>
                        <option>Professional</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Font Size
                      </label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Spacing
                      </label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
                        <option>Compact</option>
                        <option>Standard</option>
                        <option>Spacious</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resume options */}
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="text-sm font-medium text-gray-900">Resume Options</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <button className="inline-flex items-center text-sm text-gray-700 hover:text-indigo-600">
                  <Download className="mr-1.5 h-4 w-4" />
                  Download PDF
                </button>
                <button className="inline-flex items-center text-sm text-gray-700 hover:text-indigo-600">
                  <Printer className="mr-1.5 h-4 w-4" />
                  Print
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button className="inline-flex items-center text-sm text-gray-700 hover:text-indigo-600">
                  <Edit className="mr-1.5 h-4 w-4" />
                  Edit Content
                </button>
                <button className="inline-flex items-center text-sm text-gray-700 hover:text-indigo-600">
                  <Share2 className="mr-1.5 h-4 w-4" />
                  Share
                </button>
              </div>
              <div className="pt-3">
                <button className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                  <FileText className="mr-1.5 h-4 w-4" />
                  Create New Version
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resume preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-lg bg-white p-2 shadow sm:p-6">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Resume Preview: {templates.find(t => t.id === selectedTemplate)?.name}
              </h2>
              <div className="flex items-center space-x-2">
                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <span className="text-sm text-gray-500">1/3</span>
                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative mx-auto h-[700px] w-full max-w-[500px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
              {selectedTemplate === 'modern' && <ModernResumeTemplate />}
              {selectedTemplate === 'classic' && <ClassicResumeTemplate />}
              {selectedTemplate === 'creative' && <CreativeResumeTemplate />}
              {selectedTemplate === 'minimal' && <MinimalResumeTemplate />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SectionItemProps {
  title: string;
  enabled: boolean;
}

const SectionItem: React.FC<SectionItemProps> = ({ title, enabled }) => {
  return (
    <li className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={enabled}
          readOnly
        />
        <span className="ml-2 text-sm text-gray-700">{title}</span>
      </div>
      <div className="flex">
        <button className="rounded p-1 text-gray-400 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button className="rounded p-1 text-gray-400 hover:text-gray-700">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
};

interface ColorOptionProps {
  color: string;
  active: boolean;
}

const ColorOption: React.FC<ColorOptionProps> = ({ color, active }) => {
  return (
    <button
      className={`h-6 w-6 rounded-full ${color} ${
        active ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
      }`}
    />
  );
};

// Resume Templates Components
const ModernResumeTemplate: React.FC = () => {
  return (
    <div className="h-full w-full bg-white p-5 text-xs">
      {/* Header with blue background */}
      <div className="mb-4 rounded bg-blue-600 p-4 text-white">
        <h1 className="text-lg font-bold">John Doe</h1>
        <p>Senior Frontend Developer</p>
        <div className="mt-2 flex text-[10px]">
          <span className="mr-3">john.doe@example.com</span>
          <span className="mr-3">(555) 123-4567</span>
          <span>San Francisco, CA</span>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-3">
        <h2 className="mb-1 border-b border-blue-600 text-sm font-semibold text-blue-600">
          Professional Summary
        </h2>
        <p className="text-[10px] text-gray-700">
          Senior Frontend Developer with 8+ years of experience building responsive and performant web applications using modern JavaScript frameworks. Specialized in React, TypeScript, and state management solutions.
        </p>
      </div>

      {/* Experience */}
      <div className="mb-3">
        <h2 className="mb-1 border-b border-blue-600 text-sm font-semibold text-blue-600">
          Experience
        </h2>
        
        <div className="mb-2">
          <div className="flex items-baseline justify-between">
            <h3 className="font-medium">Senior Frontend Developer</h3>
            <span className="text-[9px]">2020 - Present</span>
          </div>
          <p className="text-[10px] font-medium text-gray-700">TechCorp Inc.</p>
          <ul className="ml-3 list-disc text-[9px] text-gray-700">
            <li>Led frontend architecture for company's flagship SaaS product</li>
            <li>Improved application performance by 40% through code optimization</li>
            <li>Mentored junior developers and established code review practices</li>
          </ul>
        </div>
        
        <div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-medium">Frontend Developer</h3>
            <span className="text-[9px]">2018 - 2020</span>
          </div>
          <p className="text-[10px] font-medium text-gray-700">Web Solutions Ltd.</p>
          <ul className="ml-3 list-disc text-[9px] text-gray-700">
            <li>Developed responsive web applications using React and Redux</li>
            <li>Implemented unit and integration testing with Jest and RTL</li>
            <li>Collaborated with UX designers to implement pixel-perfect designs</li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="mb-3">
        <h2 className="mb-1 border-b border-blue-600 text-sm font-semibold text-blue-600">
          Education
        </h2>
        <div className="flex items-baseline justify-between">
          <h3 className="font-medium">BS in Computer Science</h3>
          <span className="text-[9px]">2014 - 2018</span>
        </div>
        <p className="text-[10px] text-gray-700">University of Technology</p>
      </div>

      {/* Skills */}
      <div className="mb-3">
        <h2 className="mb-1 border-b border-blue-600 text-sm font-semibold text-blue-600">
          Skills
        </h2>
        <div className="flex flex-wrap gap-1">
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-800">React</span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-800">TypeScript</span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-800">Redux</span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-800">Next.js</span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-800">Tailwind CSS</span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-800">GraphQL</span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-800">Jest</span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-800">CI/CD</span>
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="mb-1 border-b border-blue-600 text-sm font-semibold text-blue-600">
          Projects
        </h2>
        <div className="mb-1">
          <h3 className="font-medium">E-commerce Platform Redesign</h3>
          <p className="text-[9px] text-gray-700">
            Led the frontend development team in redesigning the company's e-commerce platform, resulting in a 25% increase in user engagement and 15% higher conversion rates.
          </p>
        </div>
        <div>
          <h3 className="font-medium">Internal Analytics Dashboard</h3>
          <p className="text-[9px] text-gray-700">
            Developed a real-time analytics dashboard using React, D3.js, and Firebase, allowing team members to monitor key performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

const ClassicResumeTemplate: React.FC = () => {
  return (
    <div className="h-full w-full bg-white p-5 text-xs">
      {/* Header */}
      <div className="mb-4 border-b-2 border-gray-300 pb-2 text-center">
        <h1 className="text-xl font-bold uppercase tracking-wide">John Doe</h1>
        <p className="text-sm uppercase tracking-wider text-gray-600">Senior Frontend Developer</p>
        <div className="mt-2 flex justify-center text-[10px] text-gray-600">
          <span className="mr-3">john.doe@example.com</span>
          <span className="mr-3">|</span>
          <span className="mr-3">(555) 123-4567</span>
          <span className="mr-3">|</span>
          <span>San Francisco, CA</span>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-3">
        <h2 className="mb-1 text-sm font-bold uppercase">
          Professional Summary
        </h2>
        <hr className="mb-1 border-gray-300" />
        <p className="text-[10px] text-gray-700">
          Senior Frontend Developer with 8+ years of experience building responsive and performant web applications using modern JavaScript frameworks. Specialized in React, TypeScript, and state management solutions.
        </p>
      </div>

      {/* Experience */}
      <div className="mb-3">
        <h2 className="mb-1 text-sm font-bold uppercase">
          Professional Experience
        </h2>
        <hr className="mb-1 border-gray-300" />
        
        <div className="mb-2">
          <div className="flex items-baseline justify-between">
            <h3 className="font-bold">TechCorp Inc.</h3>
            <span className="text-[9px]">2020 - Present</span>
          </div>
          <p className="text-[10px] italic text-gray-700">Senior Frontend Developer</p>
          <ul className="ml-3 list-disc text-[9px] text-gray-700">
            <li>Led frontend architecture for company's flagship SaaS product</li>
            <li>Improved application performance by 40% through code optimization</li>
            <li>Mentored junior developers and established code review practices</li>
          </ul>
        </div>
        
        <div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-bold">Web Solutions Ltd.</h3>
            <span className="text-[9px]">2018 - 2020</span>
          </div>
          <p className="text-[10px] italic text-gray-700">Frontend Developer</p>
          <ul className="ml-3 list-disc text-[9px] text-gray-700">
            <li>Developed responsive web applications using React and Redux</li>
            <li>Implemented unit and integration testing with Jest and RTL</li>
            <li>Collaborated with UX designers to implement pixel-perfect designs</li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="mb-3">
        <h2 className="mb-1 text-sm font-bold uppercase">
          Education
        </h2>
        <hr className="mb-1 border-gray-300" />
        <div className="flex items-baseline justify-between">
          <h3 className="font-bold">University of Technology</h3>
          <span className="text-[9px]">2014 - 2018</span>
        </div>
        <p className="text-[10px] italic text-gray-700">BS in Computer Science</p>
      </div>

      {/* Skills */}
      <div className="mb-3">
        <h2 className="mb-1 text-sm font-bold uppercase">
          Technical Skills
        </h2>
        <hr className="mb-1 border-gray-300" />
        <p className="text-[10px] text-gray-700">
          <strong>Frontend:</strong> React, TypeScript, Redux, Next.js, HTML5, CSS3, Tailwind CSS
        </p>
        <p className="text-[10px] text-gray-700">
          <strong>Testing:</strong> Jest, React Testing Library, Cypress
        </p>
        <p className="text-[10px] text-gray-700">
          <strong>Other:</strong> GraphQL, REST APIs, Git, CI/CD, Agile/Scrum
        </p>
      </div>

      {/* Projects */}
      <div>
        <h2 className="mb-1 text-sm font-bold uppercase">
          Key Projects
        </h2>
        <hr className="mb-1 border-gray-300" />
        <div className="mb-1">
          <h3 className="font-bold">E-commerce Platform Redesign</h3>
          <p className="text-[9px] text-gray-700">
            Led the frontend development team in redesigning the company's e-commerce platform, resulting in a 25% increase in user engagement and 15% higher conversion rates.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Internal Analytics Dashboard</h3>
          <p className="text-[9px] text-gray-700">
            Developed a real-time analytics dashboard using React, D3.js, and Firebase, allowing team members to monitor key performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

const CreativeResumeTemplate: React.FC = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-50 to-white p-5 text-xs">
      {/* Left sidebar */}
      <div className="flex h-full">
        <div className="w-1/3 pr-3">
          <div className="mb-4 rounded-full bg-purple-600 p-5 text-center text-white">
            <h1 className="text-sm font-bold">John Doe</h1>
            <p className="text-[10px]">Frontend Developer</p>
          </div>
          
          <div className="mb-3 rounded-lg bg-white p-2 shadow-sm">
            <h2 className="font-medium text-purple-600">Contact</h2>
            <div className="mt-1 text-[9px] text-gray-600">
              <p className="mb-1">john.doe@example.com</p>
              <p className="mb-1">(555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </div>
          
          <div className="mb-3 rounded-lg bg-white p-2 shadow-sm">
            <h2 className="font-medium text-purple-600">Skills</h2>
            <div className="mt-1">
              <div className="mb-1">
                <p className="text-[9px] font-medium">React</p>
                <div className="h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 rounded-full bg-purple-600" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-[9px] font-medium">TypeScript</p>
                <div className="h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 rounded-full bg-purple-600" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-[9px] font-medium">Next.js</p>
                <div className="h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 rounded-full bg-purple-600" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-[9px] font-medium">GraphQL</p>
                <div className="h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 rounded-full bg-purple-600" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-[9px] font-medium">CSS/Tailwind</p>
                <div className="h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 rounded-full bg-purple-600" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-2 shadow-sm">
            <h2 className="font-medium text-purple-600">Education</h2>
            <div className="mt-1">
              <p className="text-[9px] font-medium">BS in Computer Science</p>
              <p className="text-[8px] text-gray-600">University of Technology</p>
              <p className="text-[8px] text-gray-500">2014 - 2018</p>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-2/3 pl-3">
          <div className="mb-3 rounded-lg bg-white p-2 shadow-sm">
            <h2 className="font-medium text-purple-600">Profile</h2>
            <p className="mt-1 text-[9px] text-gray-700">
              Senior Frontend Developer with 8+ years of experience building responsive and performant web applications using modern JavaScript frameworks. Specialized in React, TypeScript, and state management solutions.
            </p>
          </div>
          
          <div className="mb-3 rounded-lg bg-white p-2 shadow-sm">
            <h2 className="font-medium text-purple-600">Experience</h2>
            
            <div className="mt-1 mb-2 border-l-2 border-purple-200 pl-2">
              <div className="relative">
                <div className="absolute -left-[13px] top-1 h-3 w-3 rounded-full bg-purple-600"></div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[9px] font-medium">Senior Frontend Developer</h3>
                  <span className="text-[8px] text-gray-500">2020 - Present</span>
                </div>
                <p className="text-[8px] text-purple-500">TechCorp Inc.</p>
                <ul className="ml-2 list-disc text-[8px] text-gray-700">
                  <li>Led frontend architecture for company's flagship SaaS product</li>
                  <li>Improved application performance by 40% through code optimization</li>
                  <li>Mentored junior developers and established code review practices</li>
                </ul>
              </div>
            </div>
            
            <div className="border-l-2 border-purple-200 pl-2">
              <div className="relative">
                <div className="absolute -left-[13px] top-1 h-3 w-3 rounded-full bg-purple-600"></div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[9px] font-medium">Frontend Developer</h3>
                  <span className="text-[8px] text-gray-500">2018 - 2020</span>
                </div>
                <p className="text-[8px] text-purple-500">Web Solutions Ltd.</p>
                <ul className="ml-2 list-disc text-[8px] text-gray-700">
                  <li>Developed responsive web applications using React and Redux</li>
                  <li>Implemented unit and integration testing with Jest and RTL</li>
                  <li>Collaborated with UX designers to implement pixel-perfect designs</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-2 shadow-sm">
            <h2 className="font-medium text-purple-600">Projects</h2>
            
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div className="rounded bg-purple-50 p-1.5">
                <h3 className="text-[9px] font-medium">E-commerce Platform Redesign</h3>
                <p className="text-[8px] text-gray-700">
                  Led the frontend development team in redesigning the company's e-commerce platform, resulting in a 25% increase in user engagement.
                </p>
              </div>
              
              <div className="rounded bg-purple-50 p-1.5">
                <h3 className="text-[9px] font-medium">Internal Analytics Dashboard</h3>
                <p className="text-[8px] text-gray-700">
                  Developed a real-time analytics dashboard using React, D3.js, and Firebase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MinimalResumeTemplate: React.FC = () => {
  return (
    <div className="h-full w-full bg-white p-5 text-xs">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-light uppercase tracking-widest">John Doe</h1>
        <p className="text-sm font-light uppercase tracking-wider text-gray-500">Senior Frontend Developer</p>
        <div className="mt-2 flex justify-center text-[10px] text-gray-500">
          <span className="mr-3">john.doe@example.com</span>
          <span className="mr-3">•</span>
          <span className="mr-3">(555) 123-4567</span>
          <span className="mr-3">•</span>
          <span>San Francisco, CA</span>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-4">
        <h2 className="mb-2 text-center text-sm font-light uppercase tracking-wider">
          Professional Summary
        </h2>
        <p className="text-[10px] leading-relaxed text-gray-700">
          Senior Frontend Developer with 8+ years of experience building responsive and performant web applications using modern JavaScript frameworks. Specialized in React, TypeScript, and state management solutions.
        </p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="mb-2 text-center text-sm font-light uppercase tracking-wider">
          Experience
        </h2>
        
        <div className="mb-3">
          <div className="flex items-baseline justify-between">
            <h3 className="font-medium">Senior Frontend Developer</h3>
            <span className="text-[9px] text-gray-500">2020 - Present</span>
          </div>
          <p className="text-[10px] text-gray-500">TechCorp Inc.</p>
          <ul className="mt-1 ml-3 list-disc text-[9px] text-gray-700">
            <li>Led frontend architecture for company's flagship SaaS product</li>
            <li>Improved application performance by 40% through code optimization</li>
            <li>Mentored junior developers and established code review practices</li>
          </ul>
        </div>
        
        <div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-medium">Frontend Developer</h3>
            <span className="text-[9px] text-gray-500">2018 - 2020</span>
          </div>
          <p className="text-[10px] text-gray-500">Web Solutions Ltd.</p>
          <ul className="mt-1 ml-3 list-disc text-[9px] text-gray-700">
            <li>Developed responsive web applications using React and Redux</li>
            <li>Implemented unit and integration testing with Jest and RTL</li>
            <li>Collaborated with UX designers to implement pixel-perfect designs</li>
          </ul>
        </div>
      </div>

      {/* Education & Skills in two columns */}
      <div className="mb-4 flex gap-4">
        <div className="w-1/2">
          <h2 className="mb-2 text-center text-sm font-light uppercase tracking-wider">
            Education
          </h2>
          <div>
            <h3 className="font-medium">BS in Computer Science</h3>
            <p className="text-[10px] text-gray-500">University of Technology</p>
            <p className="text-[9px] text-gray-500">2014 - 2018</p>
          </div>
        </div>
        
        <div className="w-1/2">
          <h2 className="mb-2 text-center text-sm font-light uppercase tracking-wider">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[9px] text-gray-600">React</span>
            <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[9px] text-gray-600">TypeScript</span>
            <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[9px] text-gray-600">Redux</span>
            <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[9px] text-gray-600">Next.js</span>
            <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[9px] text-gray-600">GraphQL</span>
            <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[9px] text-gray-600">Jest</span>
            <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[9px] text-gray-600">CSS3</span>
            <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[9px] text-gray-600">Git</span>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="mb-2 text-center text-sm font-light uppercase tracking-wider">
          Key Projects
        </h2>
        <div className="mb-2">
          <h3 className="font-medium">E-commerce Platform Redesign</h3>
          <p className="text-[9px] text-gray-700">
            Led the frontend development team in redesigning the company's e-commerce platform, resulting in a 25% increase in user engagement and 15% higher conversion rates.
          </p>
        </div>
        <div>
          <h3 className="font-medium">Internal Analytics Dashboard</h3>
          <p className="text-[9px] text-gray-700">
            Developed a real-time analytics dashboard using React, D3.js, and Firebase, allowing team members to monitor key performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;