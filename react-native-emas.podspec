require 'json'

package = JSON.parse(File.read(File.join(__dir__, './package.json')))

Pod::Spec.new do |s|
  s.name                = "react-native-emas"
  s.version             = "0.0.1"
  s.summary             = package['description']
  s.description         = <<-DESC
                            React Native apps are built using the React JS
                            framework, and render directly to native UIKit
                            elements using a fully asynchronous architecture.
                            There is no browser and no HTML. We have picked what
                            we think is the best set of features from these and
                            other technologies to build what we hope to become
                            the best product development framework available,
                            with an emphasis on iteration speed, developer
                            delight, continuity of technology, and absolutely
                            beautiful and fast products with no compromises in
                            quality or capability.
                         DESC
  s.homepage            = "http://git.terminus.io/reactnative_components/react-native-umeng.git"
  s.license             = package['license']
  s.author              = "lhd"
  s.source              = { :git => "git@git.terminus.io:reactnative_components/react-native-umeng.git"}
  s.requires_arc        = true
  s.platform            = :ios, "7.0"
  s.preserve_paths      = "*.framework"
  s.source_files        = 'ios/Source/**/*.{h,m}'
  s.vendored_frameworks = 'lib/*.framework'
  s.dependency 'React'
  s.dependency 'AlicloudMAN','1.0.12'
  s.dependency 'AlicloudUT','5.2.0.8'
end
