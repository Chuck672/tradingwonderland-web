"use client";

import { useLanguage } from "@/components/language-provider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function PrivacyPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {isZh ? "返回首页" : "Back to Home"}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isZh ? "隐私政策" : "Privacy Policy"}
          </h1>
          <p className="text-gray-400">
            {isZh ? "最后更新时间：2026年4月2日" : "Last Updated: April 2, 2026"}
          </p>
        </div>

        <div className="prose prose-invert max-w-none pt-8 border-t border-white/10 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "1. 引言" : "1. Introduction"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "量化逻辑实验室（QuantLogicLab，“我们”或“本平台”）尊重您的隐私并致力于保护您的个人数据。本隐私政策概述了当您访问我们的网站、订阅我们的软件文档或使用我们的算法研究工具时，我们如何收集、使用、处理和保护您的信息。" : 
                "QuantLogicLab (\"we\", \"our\", or \"the Platform\") respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, process, and safeguard your information when you visit our website, subscribe to our software documentation, or use our algorithmic research tools."
              }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "2. 我们收集的信息" : "2. Information We Collect"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? "我们可能收集以下类型的个人数据：" : "We may collect the following types of personal data:"}
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-300 text-sm">
              <li><strong>{isZh ? "身份数据：" : "Identity Data:"}</strong> {isZh ? "姓名、用户名和个人资料图片（在您注册账户时）。" : "Name, username, and profile pictures (when you register for an account)."}</li>
              <li><strong>{isZh ? "联系数据：" : "Contact Data:"}</strong> {isZh ? "用于身份验证和通信的电子邮件地址。" : "Email address used for authentication and communications."}</li>
              <li><strong>{isZh ? "技术数据：" : "Technical Data:"}</strong> {isZh ? "IP 地址、浏览器类型、设备信息和在您在我们网站上的使用模式。" : "IP address, browser type, device information, and usage patterns on our website."}</li>
              <li><strong>{isZh ? "交易数据：" : "Transaction Data:"}</strong> {isZh ? "订阅详情、购买历史（注意：支付处理由 LemonSqueezy 等第三方名义商家提供商处理；我们不存储完整的信用卡号）。" : "Subscription details, purchase history (Note: Payment processing is handled by third-party providers like LemonSqueezy; we do not store full credit card numbers)."}</li>
              <li><strong>{isZh ? "MT5 账户绑定：" : "MT5 Account Linkage:"}</strong> {isZh ? "为了软件授权，我们可能会临时记录您的 MT5 账户 ID，以验证下载指标/EA的许可。" : "For software authorization, we may temporarily log your MT5 account ID to verify the licensing of downloaded indicators/EAs."}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "3. 我们如何使用您的数据" : "3. How We Use Your Data"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? "我们严格将您的数据用于提供、维护和改进我们的服务：" : "We use your data strictly to provide, maintain, and improve our services:"}
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-300 text-sm">
              <li>{isZh ? "用于管理您的账户、验证登录并保护我们的平台。" : "To manage your account, authenticate logins, and secure our platform."}</li>
              <li>{isZh ? "用于交付软件许可证、代码片段和研究材料。" : "To deliver software licenses, code snippets, and research materials."}</li>
              <li>{isZh ? "通过授权的名义商家处理付款并管理您的订阅。" : "To process payments and manage your subscriptions via authorized Merchants of Record."}</li>
              <li>{isZh ? "用于响应您的支持请求、查询和技术问题。" : "To respond to your support requests, inquiries, and technical issues."}</li>
              <li>{isZh ? "用于监控网站分析、防止欺诈并确保遵守我们的服务条款。" : "To monitor website analytics, prevent fraud, and ensure compliance with our Terms of Service."}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "4. 数据共享与披露" : "4. Data Sharing and Disclosure"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? "我们不会向第三方出售、出租或交易您的个人数据。我们仅在以下情况下共享数据：" : "We do not sell, rent, or trade your personal data to third parties. We may share data only under the following circumstances:"}
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-300 text-sm">
              <li><strong>{isZh ? "服务提供商：" : "Service Providers:"}</strong> {isZh ? "我们会与协助我们运营网站、开展业务或处理付款的受信任第三方（例如 LemonSqueezy、托管提供商）共享必要的数据。" : "We share necessary data with trusted third parties who assist us in operating our website, conducting our business, or processing payments (e.g., LemonSqueezy, hosting providers)."}</li>
              <li><strong>{isZh ? "法律合规：" : "Legal Compliance:"}</strong> {isZh ? "如果法律、传票或其他法律程序要求，或者为了保护 QuantLogicLab、我们的用户或其他人的权利、财产或安全，我们可能会披露信息。" : "We may disclose information if required by law, subpoena, or other legal processes, or to protect the rights, property, or safety of QuantLogicLab, our users, or others."}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "5. 数据安全" : "5. Data Security"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "我们实施适当的技术和组织安全措施，以保护您的个人数据免遭未经授权的访问、更改、披露或破坏。但是，没有任何通过互联网传输或电子存储的方法是 100% 安全的，我们无法保证绝对的安全。" : 
                "We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
              }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "6. 您的权利" : "6. Your Rights"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "根据您所在的位置，您可能有权访问、更正、删除或限制处理您的个人数据。您可以在您的账户仪表板中更新您的个人资料信息，或直接联系我们以行使您的权利。" : 
                "Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data. You can update your profile information within your account dashboard or contact us directly to exercise your rights."
              }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "7. 隐私政策的变更" : "7. Changes to This Privacy Policy"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "我们可能会定期更新本隐私政策。我们将通过在此页面上发布新的隐私政策并更新“最后更新”日期来通知您重大更改。我们鼓励您定期查看本隐私政策。" : 
                "We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date. We encourage you to review this Privacy Policy periodically."
              }
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}