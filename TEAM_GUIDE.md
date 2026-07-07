# 👥 Team Management Guide

## 🎯 คู่มือการจัดการทีมพัฒนาเกม

### บทบาทในทีม (Team Roles)

#### 1. Project Manager (ผู้จัดการโปรเจกต์)
**ความรับผิดชอบ:**
- วางแผนและติดตาม timeline
- จัดการ resources
- ประสานงานระหว่างทีม
- แก้ไขปัญหาและอุปสรรค
- รายงานความคืบหน้า

**ทักษะที่ต้องการ:**
- Leadership
- Communication
- Time management
- Risk management
- Agile/Scrum

#### 2. Game Designer (นักออกแบบเกม)
**ความรับผิดชอบ:**
- ออกแบบ gameplay mechanics
- สร้าง game balance
- ออกแบบเลเวลและด่าน
- เขียน game design document (GDD)
- ทดสอบและปรับแต่งเกม

**ทักษะที่ต้องการ:**
- Game design principles
- Level design
- System design
- Data analysis
- Creativity

#### 3. Developer (นักพัฒนา)
**ความรับผิดชอบ:**
- เขียนโค้ดเกม
- Implement features
- แก้ไข bugs
- Optimize performance
- Code review

**ทักษะที่ต้องการ:**
- React Native / TypeScript
- State management
- API integration
- Debugging
- Version control (Git)

#### 4. UI/UX Designer (นักออกแบบอินเทอร์เฟซ)
**ความรับผิดชอบ:**
- ออกแบบ UI screens
- สร้าง user flow
- ออกแบบ icons และ elements
- สร้าง prototypes
- Usability testing

**ทักษะที่ต้องการ:**
- Figma / Sketch / Adobe XD
- UI design principles
- UX research
- Prototyping
- Visual design

#### 5. Content Creator (ผู้สร้างเนื้อหา)
**ความรับผิดชอบ:**
- เขียนข้อสอบและคำถาม
- เขียนบทและเรื่องราว
- สร้างตัวละครและโลกเกม
- Localization (แปลภาษา)
- Fact-checking

**ทักษะที่ต้องการ:**
- Writing skills
- Research skills
- Attention to detail
- Knowledge of exam content
- Language skills (TH/EN)

#### 6. Artist (ศิลปิน)
**ความรับผิดชอบ:**
- สร้าง character sprites
- สร้าง backgrounds
- สร้าง UI assets
- สร้าง animations
- Create marketing materials

**ทักษะที่ต้องการ:**
- Digital art (Photoshop, Illustrator)
- Character design
- Concept art
- Animation (optional)
- Art styles consistency

#### 7. Sound Designer (นักออกแบบเสียง)
**ความรับผิดชอบ:**
- สร้าง sound effects
- เลือก/สร้าง background music
- Voice direction (ถ้ามี)
- Audio implementation
- Audio mixing

**ทักษะที่ต้องการ:**
- Audio editing (Audacity, FL Studio)
- Sound design
- Music composition (optional)
- Audio implementation in games

#### 8. QA Tester (ผู้ทดสอบ)
**ความรับผิดชอบ:**
- ทดสอบ features
- รายงาน bugs
- เขียน test cases
- Regression testing
- Performance testing

**ทักษะที่ต้องการ:**
- Attention to detail
- Systematic thinking
- Bug tracking tools
- Test case design
- Communication

#### 9. Marketing Specialist (ผู้เชี่ยวชาญการตลาด)
**ความรับผิดชอบ:**
- วางแผนการตลาด
- จัดการ social media
- ASO (App Store Optimization)
- Influencer outreach
- Analytics tracking

**ทักษะที่ต้องการ:**
- Digital marketing
- Social media management
- Content creation
- Data analysis
- Community management

---

## 📋 Team Structures

### Structure 1: Small Team (3-5 คน)
```
Project Manager (1)
├── Developer (1-2)
├── Designer (1)
└── Content Creator (1)
```

**เหมาะสำหรับ:**
- โปรเจกต์เล็ก
- งบประมาณจำกัด
- MVP development

**ข้อดี:**
- Communication ง่าย
- ตัดสินใจเร็ว
- Cost ต่ำ

**ข้อเสีย:**
- งานเยอะต่อคน
- ทักษะจำกัด
- Burnout risk สูง

### Structure 2: Medium Team (6-10 คน)
```
Project Manager (1)
├── Development Lead (1)
│   ├── Developers (2-3)
│   └── QA Tester (1)
├── Design Lead (1)
│   ├── UI/UX Designer (1)
│   └── Artist (1)
├── Content Lead (1)
│   └── Content Creators (1-2)
└── Marketing (1)
```

**เหมาะสำหรับ:**
- โปรเจกต์ขนาดกลาง
- มี funding
- Full production

**ข้อดี:**
- มีความเชี่ยวชาญเฉพาะ
- งานกระจายดี
- Quality สูง

**ข้อเสีย:**
- Communication ซับซ้อน
- Cost สูงขึ้น
- Decision ช้าลง

### Structure 3: Large Team (11-20+ คน)
```
Project Director (1)
├── Production (2-3)
├── Development (5-8)
├── Design (3-4)
├── Art (3-4)
├── Audio (1-2)
├── QA (2-3)
└── Marketing (2-3)
```

**เหมาะสำหรับ:**
- โปรเจกต์ใหญ่
- Studio level
- Multiple projects

**ข้อดี:**
- ความเชี่ยวชาญสูง
- งานคุณภาพสูง
- Scalability

**ข้อเสีย:**
- Management ยาก
- Cost สูงมาก
- Bureaucracy

---

## 🔄 Development Workflow

### Agile/Scrum Methodology

#### Sprint Planning (เริ่ม Sprint)
**ระยะเวลา:** 2-4 สัปดาห์ ต่อ sprint
**ผู้เข้าร่วม:** ทุกคนในทีม

**กิจกรรม:**
1. Review backlog
2. Estimate story points
3. Commit to sprint goals
4. Assign tasks

**Output:**
- Sprint backlog
- Task assignments
- Sprint goal

#### Daily Standup (ทุกวัน)
**ระยะเวลา:** 15 นาที
**ผู้เข้าร่วม:** Development team

**คำถาม 3 ข้อ:**
1. เมื่อวานทำอะไร?
2. วันนี้จะทำอะไร?
3. มีอุปสรรคอะไร?

**Output:**
- Updated task status
- Identified blockers
- Team alignment

#### Sprint Review (ท้าย Sprint)
**ระยะเวลา:** 1-2 ชั่วโมง
**ผู้เข้าร่วม:** ทีม + Stakeholders

**กิจกรรม:**
1. Demo features ที่เสร็จแล้ว
2. รับ feedback
3. Discuss next steps

**Output:**
- Feedback
- Updated backlog
- Stakeholder alignment

#### Sprint Retrospective (ท้าย Sprint)
**ระยะเวลา:** 1-2 ชั่วโมง
**ผู้เข้าร่วม:** ทีมเท่านั้น

**กิจกรรม:**
1. What went well?
2. What could be improved?
3. Action items for next sprint

**Output:**
- Improvement plan
- Action items
- Team learnings

---

## 📅 Meeting Schedule

### Regular Meetings

#### Daily Standup
- **เวลา:** ทุกวัน 9:00 AM (15 นาที)
- **ผู้เข้าร่วม:** Development team
- **รูปแบบ:** In-person / Video call
- **Agenda:** 3 questions (Yesterday, Today, Blockers)

#### Sprint Planning
- **เวลา:** วันจันทร์แรกของ Sprint (2 ชั่วโมง)
- **ผู้เข้าร่วม:** ทุกคน
- **รูปแบบ:** In-person / Video call
- **Agenda:** Plan sprint goals, assign tasks

#### Design Review
- **เวลา:** วันพุธ (1 ชั่วโมง)
- **ผู้เข้าร่วม:** Designers, Developers, PM
- **รูปแบบ:** In-person / Video call
- **Agenda:** Review designs, get feedback

#### Stakeholder Update
- **เวลา:** วันศุกร์ (30 นาที)
- **ผู้เข้าร่วม:** PM, Stakeholders
- **รูปแบบ:** Video call / Email report
- **Agenda:** Weekly progress, risks, next week plan

#### Retrospective
- **เวลา:** วันสุดท้ายของ Sprint (1-2 ชั่วโมง)
- **ผู้เข้าร่วม:** ทุกคน
- **รูปแบบ:** In-person / Video call
- **Agenda:** Reflect, improve, action items

---

## 🛠️ Tools & Software

### Project Management
- **Jira**: Issue tracking, sprint planning
- **Trello**: Kanban board, simple projects
- **Asana**: Task management
- **Notion**: Documentation, wiki
- **ClickUp**: All-in-one

**Recommended:** Jira + Confluence

### Communication
- **Slack**: Team chat
- **Microsoft Teams**: Enterprise chat
- **Discord**: Community, informal
- **Line**: Thai team, informal
- **Email**: Formal communication

**Recommended:** Slack + Email

### Version Control
- **GitHub**: Code hosting, PR review
- **GitLab**: Code hosting, CI/CD
- **Bitbucket**: Code hosting, Jira integration

**Recommended:** GitHub

### Design
- **Figma**: UI/UX design, prototyping
- **Adobe XD**: UI/UX design
- **Sketch**: UI design (Mac only)
- **Photoshop**: Image editing
- **Illustrator**: Vector graphics

**Recommended:** Figma + Adobe Creative Cloud

### Documentation
- **Confluence**: Team wiki
- **Notion**: All-in-one workspace
- **Google Docs**: Collaborative editing
- **Markdown files**: In-repo documentation

**Recommended:** Notion + Markdown files

### Testing
- **TestFlight**: iOS testing
- **Google Play Console**: Android testing
- **Firebase App Distribution**: Cross-platform
- **BrowserStack**: Cross-device testing

**Recommended:** TestFlight + Google Play Console

### Analytics
- **Firebase Analytics**: User analytics
- **Mixpanel**: Product analytics
- **Amplitude**: Product analytics
- **App Annie**: Market intelligence

**Recommended:** Firebase Analytics + Mixpanel

---

## 📊 Performance Management

### Individual Performance

#### Metrics for Developers
- Code quality (bugs, code review feedback)
- Velocity (story points completed)
- Code review participation
- Knowledge sharing
- Problem solving

#### Metrics for Designers
- Design quality (user feedback)
- Delivery timeliness
- Iteration speed
- Collaboration with devs
- Innovation

#### Metrics for Content Creators
- Content quality (accuracy, engagement)
- Output volume
- Research depth
- Localization quality
- User feedback

#### Metrics for QA
- Bugs found
- Bug report quality
- Test coverage
- Regression testing thoroughness
- Automation contribution

### Team Performance

#### Key Metrics
- **Velocity**: Story points per sprint
- **Sprint Goal Success Rate**: % of sprints meeting goals
- **Bug Rate**: Bugs per feature
- **Cycle Time**: Time from start to delivery
- **Team Satisfaction**: Regular surveys

#### Performance Reviews
- **Frequency:** Quarterly
- **Format:** 1-on-1 meetings
- **Preparation:** Self-assessment, peer feedback
- **Output:** Goals for next quarter, development plan

---

## 💰 Compensation & Incentives

### Salary Ranges (Thailand, per month)

#### Junior Level (0-2 years)
- Developer: 30,000 - 50,000 THB
- Designer: 25,000 - 45,000 THB
- Content Creator: 25,000 - 40,000 THB
- QA: 20,000 - 35,000 THB

#### Mid Level (3-5 years)
- Developer: 50,000 - 80,000 THB
- Designer: 45,000 - 70,000 THB
- Content Creator: 40,000 - 60,000 THB
- QA: 35,000 - 55,000 THB

#### Senior Level (5+ years)
- Developer: 80,000 - 150,000+ THB
- Designer: 70,000 - 120,000+ THB
- Content Creator: 60,000 - 100,000+ THB
- QA: 55,000 - 90,000+ THB

#### Management
- Project Manager: 80,000 - 200,000+ THB
- Tech Lead: 100,000 - 250,000+ THB
- Creative Director: 100,000 - 250,000+ THB

### Equity/Profit Sharing

#### Startup Model
- Founders: 60-80%
- Employee Pool: 10-20%
- Investors: 10-20%

#### Profit Sharing
- 10-20% of profits shared among team
- Based on contribution and level
- Quarterly or annual distribution

#### Bonus Structure
- Performance bonus: 1-3 months salary
- Milestone bonus: Upon major achievements
- Revenue bonus: % of revenue targets met

---

## 🎯 Team Building

### Hiring Process

#### 1. Job Posting
- Clear role description
- Required skills
- Nice-to-have skills
- Company culture
- Benefits

#### 2. Screening
- Resume review
- Portfolio review (for designers/artists)
- GitHub review (for developers)
- Phone screening (15-30 min)

#### 3. Assessment
- **Developers:** Coding test (2-4 hours)
- **Designers:** Design challenge (4-8 hours)
- **Content:** Writing sample (1-2 hours)
- **QA:** Test case creation (1-2 hours)

#### 4. Interview
- Technical interview (with team)
- Cultural fit interview (with PM/Founder)
- Final interview (with leadership)

#### 5. Offer
- Salary negotiation
- Start date
- Onboarding plan

### Onboarding Process

#### Week 1: Orientation
- Company overview
- Team introductions
- Tool setup
- Project overview
- First task assignment

#### Week 2-4: Training
- Domain knowledge
- Technical training
- Shadowing team members
- Small tasks

#### Month 2-3: Integration
- Regular tasks
- First major feature
- Feedback sessions
- Performance check-in

### Team Bonding Activities

#### Regular Activities
- Team lunch (weekly/bi-weekly)
- Game nights (monthly)
- Team building activities (quarterly)
- Offsite retreat (yearly)

#### Informal Activities
- Coffee breaks
- After-work drinks
- Sports activities
- Hobby groups

---

## 🚨 Conflict Resolution

### Common Conflicts

#### 1. Technical Disagreements
**Example:** Which library to use?
**Resolution:**
- Discuss pros/cons
- Prototype both options
- Make data-driven decision
- Tech lead makes final call

#### 2. Design Disagreements
**Example:** Which design is better?
**Resolution:**
- User testing
- A/B testing
- Data analysis
- Design lead decides

#### 3. Priority Conflicts
**Example:** What to build first?
**Resolution:**
- Review roadmap
- Consider business impact
- Stakeholder input
- PM makes final call

#### 4. Personality Conflicts
**Example:** Team members not getting along
**Resolution:**
- Private 1-on-1 meetings
- Mediation by PM
- Team building
- Reassign if necessary

### Conflict Resolution Process

1. **Identify the issue**
   - What's the real problem?
   - Who is involved?
   - What's the impact?

2. **Gather information**
   - Talk to involved parties separately
   - Get different perspectives
   - Understand root cause

3. **Facilitate discussion**
   - Bring parties together
   - Set ground rules
   - Focus on issue, not personalities

4. **Find solution**
   - Brainstorm options
   - Evaluate pros/cons
   - Agree on action plan

5. **Follow up**
   - Check progress
   - Provide support
   - Adjust if needed

---

## 📈 Team Growth

### Career Paths

#### Technical Track
- Junior Developer → Mid Developer → Senior Developer → Tech Lead → Architect

#### Management Track
- Developer → Tech Lead → Engineering Manager → Director → VP

#### Specialist Track
- Junior Designer → Mid Designer → Senior Designer → Principal Designer

### Skill Development

#### Training Budget
- 10,000 - 50,000 THB per person per year
- Conferences
- Online courses
- Books
- Workshops

#### Mentorship Program
- Pair junior with senior
- Regular check-ins
- Knowledge sharing
- Career guidance

#### Knowledge Sharing
- Tech talks (bi-weekly)
- Book club (monthly)
- Code review sessions
- Design critiques

---

## 🎉 Company Culture

### Values

1. **Quality First**
   - We don't compromise on quality
   - Test thoroughly
   - Iterate based on feedback

2. **User-Centric**
   - Users come first
   - Solve real problems
   - Listen to feedback

3. **Transparency**
   - Open communication
   - Share information
   - Honest feedback

4. **Innovation**
   - Try new things
   - Learn from failures
   - Continuous improvement

5. **Work-Life Balance**
   - No crunch time (unless critical)
   - Flexible hours
   - Remote work options
   - Mental health support

### Work Environment

#### Office Setup
- Comfortable desks and chairs
- Good lighting
- Quiet spaces for focus
- Collaboration spaces
- Kitchen and snacks

#### Remote Work
- Flexible hours
- Home office stipend
- Regular video calls
- Virtual team building

#### Benefits
- Health insurance
- Dental insurance
- Gym membership
- Learning budget
- Equity/profit sharing
- Paid time off
- Sick leave
- Parental leave

---

## 📞 Emergency Contacts

### Key Contacts
- **Project Manager:** [Name] - [Phone] - [Email]
- **Tech Lead:** [Name] - [Phone] - [Email]
- **HR:** [Name] - [Phone] - [Email]
- **Emergency:** [Phone]

### Escalation Path
1. Team Lead
2. Project Manager
3. Department Head
4. CEO/Founder

---

**Remember:**
- People are your most valuable asset
- Invest in your team
- Create a positive culture
- Communicate openly
- Celebrate successes together

**Build a great team, build a great game! 🎮👥**
