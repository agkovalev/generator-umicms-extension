<?php
/**
 * module: 		<%= safeModuleName %>
 * extension: 	<%= title %> (<%= safeExtensionName %>)
 * author: 		<%= authorName %> <<%= authorEmail %>>
 * url:			<%= authorURL %>
 * github:		<%= authorGitHub %>
 * company:		<%= authorCompanyName %>
 * description: Class with admin extending functions of this module.
 */
abstract class admin_<%= safeExtensionName %> {


	/**
	 * [onInit description]
	 * @return [type] [description]
	 */
	public function onInit() {

		/**
		 *
		 */
		if(cmsController::getInstance()->getCurrentMode() != 'admin')
			return;

		/**
		 * [$configTabs description]
		 * @var [type]
		 */
		$configTabs = $this->getConfigTabs();

		/**
		 *
		 */
		if ($configTabs) {
			// $configTabs->add("exampleConfigTab");
		}

		/**
		 * [$commonTabs description]
		 * @var [type]
		 */
		$commonTabs = $this->getCommonTabs();

		/**
		 *
		 */
		if($commonTabs) {
			// $commonTabs->add('exampleTab');
		}

	}

};
