helm upgrade --install --wait alda-dev apitree/alda --devel --namespace alda-dev --set \
image.tag=0.1.0-alpha.10,\
image.repositoryUrl=apitree-docker-local.jfrog.io,\
image.pullSecrets.server=apitree-docker-local.jfrog.io,\
image.pullSecrets.username=admin,\
image.pullSecrets.password=V5A5YHUyY0,\
image.pullSecrets.email=a.dostal@apitree.cz,\
domain=alda.app
